// src/models/Caption.js
const { Client } = require('@elastic/elasticsearch');
const config = require('../config');

class Caption {
  constructor() {
    this.client = new Client({ node: config.elasticsearch.node });
    this.index = config.elasticsearch.index;
  }

  async setupIndex() {
    try {
      const indexExists = await this.client.indices.exists({
        index: this.index
      });

      if (!indexExists) {
        await this.client.indices.create({
          index: this.index,
          body: {
            settings: {
              analysis: {
                analyzer: {
                  custom_analyzer: {
                    type: 'custom',
                    tokenizer: 'standard',
                    filter: ['lowercase', 'stop', 'porter_stem']
                  }
                }
              }
            },
            mappings: {
              properties: {
                videoId: { type: 'keyword' },
                fullText: { 
                  type: 'text',
                  analyzer: 'custom_analyzer',
                  search_analyzer: 'custom_analyzer'
                },
                timeMap: {
                  type: 'nested',
                  properties: {
                    startTime: { type: 'long' },
                    endTime: { type: 'long' },
                    textStart: { type: 'integer' },
                    textEnd: { type: 'integer' }
                  }
                }
              }
            }
          }
        });
        console.log('Index created successfully');
      }
    } catch (error) {
      console.error('Error setting up index:', error);
      throw error;
    }
  }

  preprocessCaption(captionData) {
    let fullText = '';
    let timeMap = [];
    
    captionData.forEach(segment => {
      let segmentText = segment.textSegments
        .map(t => t.utf8.trim())
        .join(' ');
        
      timeMap.push({
        startTime: segment.startTime,
        endTime: segment.endTime,
        textStart: fullText.length,
        textEnd: fullText.length + segmentText.length
      });
      
      fullText += segmentText + ' ';
    });
    
    return {
      fullText: fullText.trim(),
      timeMap
    };
  }

  async runIndex(videoId, captionData) {
    try {
      const { fullText, timeMap } = this.preprocessCaption(captionData);
      
      await this.client.index({
        index: this.index,
        body: {
          videoId,
          fullText,
          timeMap
        }
      });
      
      await this.client.indices.refresh({ index: this.index });
      return true;
    } catch (error) {
      console.error('Error indexing caption:', error);
      throw error;
    }
  }

  // Replace just the search method in your Caption class
async search(query, options = {}) {
    const defaultOptions = {
        fuzziness: 'AUTO',
        minimumShouldMatch: '70%',
        from: 0,
        size: 10
    };

    const searchOptions = { ...defaultOptions, ...options };

    try {
        const response = await this.client.search({
            index: this.index,
            body: {
                from: searchOptions.from,
                size: searchOptions.size,
                query: {
                    bool: {
                        must: {
                            match: {
                                fullText: {
                                    query: query,
                                    fuzziness: searchOptions.fuzziness,
                                    minimum_should_match: searchOptions.minimumShouldMatch
                                }
                            }
                        },
                        should: {
                            match_phrase: {
                                fullText: {
                                    query: query,
                                    boost: 2.0
                                }
                            }
                        }
                    }
                },
                highlight: {
                    fields: {
                        fullText: {
                            number_of_fragments: 3,
                            fragment_size: 200,
                            pre_tags: ['<em>'],
                            post_tags: ['</em>']
                        }
                    }
                }
            }
        });

        return response.hits.hits.map(hit => ({
            videoId: hit._source.videoId,
            score: hit._score,
            matches: (hit.highlight?.fullText || []).map(highlight => {
                const cleanHighlight = highlight.replace(/<\/?em>/g, '');
                const matchingSegments = this.findTimeSegments(
                    cleanHighlight,
                    hit._source.fullText,
                    hit._source.timeMap
                );
                return {
                    text: highlight,
                    segments: matchingSegments
                };
            })
        }));
    } catch (error) {
        console.error('Error searching captions:', error);
        throw error;
    }
}

  findTimeSegments(matchedText, fullText, timeMap) {
    const position = fullText.indexOf(matchedText);
    if (position === -1) return [];
    
    return timeMap.filter(segment => {
      return !(position > segment.textEnd || 
               position + matchedText.length < segment.textStart);
    });
  }
}

module.exports = Caption;