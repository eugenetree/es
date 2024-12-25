// src/example.js
const Caption = require('./models/Caption');

async function example() {
  try {
    const captionService = new Caption();
    
    // Setup index
    await captionService.setupIndex();
    
    const data = {
          "startTime": 120,
          "endTime": 4480,
          "duration": 4360,
          "textSegments": [
            {
              "utf8": "I",
              "offsetTime": 0
            },
            {
              "utf8": " just",
              "offsetTime": 160
            },
            {
              "utf8": " dropped",
              "offsetTime": 320
            },
            {
              "utf8": " off",
              "offsetTime": 679
            },
            {
              "utf8": " five",
              "offsetTime": 959
            },
            {
              "utf8": " men",
              "offsetTime": 1240
            },
            {
              "utf8": " and",
              "offsetTime": 1800
            },
            {
              "utf8": " five",
              "offsetTime": 2039
            }
          ]
        },
        {
          "startTime": 2440,
          "endTime": 6399,
          "duration": 3959,
          "textSegments": [
            {
              "utf8": "women",
              "offsetTime": 0
            },
            {
              "utf8": " in",
              "offsetTime": 439
            },
            {
              "utf8": " the",
              "offsetTime": 560
            },
            {
              "utf8": " middle",
              "offsetTime": 840
            },
            {
              "utf8": " of",
              "offsetTime": 1160
            },
            {
              "utf8": " the",
              "offsetTime": 1279
            },
            {
              "utf8": " Wilderness",
              "offsetTime": 1439
            }
          ]
    
}


    // Example caption data (your original data)
    const captionData = [
      {
        "startTime": 120,
        "endTime": 4480,
        "duration": 4360,
        "textSegments": [
          { "utf8": "I", "offsetTime": 0 },
          { "utf8": " just", "offsetTime": 160 },
          { "utf8": " dropped", "offsetTime": 320 },
          { "utf8": " off", "offsetTime": 679 }
        ]
      }
    ];
    
    // Index the caption
    console.log('Indexing caption...');
    await captionService.runIndex('video123', captionData);
    
    // Try different search variations
    console.log('\nSearching...');
    const searches = [
      'I dropped off',
      'dropped off',
      'droped of'  // intentional typo
    ];

    for (const searchQuery of searches) {
      console.log(`\nSearching for: "${searchQuery}"`);
      const results = await captionService.search(searchQuery);
      console.log(JSON.stringify(results, null, 2));
    }

  } catch (error) {
    console.error('Error in example:', error);
  }
}

// Run the example
example().catch(console.error);