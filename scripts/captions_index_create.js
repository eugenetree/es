// fetch('http://localhost:9200', {
// 	method: 'PUT',
// 	body: JSON.stringify({
// 		mappings: {
// 			properties: {
// 				videoId: { type: 'keyword' },
// 				fullText: { type: 'text' },
// 				timeMap: { type: 'nested' }
// 			}
// 		}
// 	})
// })

const body = {
  "mappings": {
    "properties": {
      "videoId": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "captions": {
        "properties": {
          "startTime": { "type": "long" },
          "endTime": { "type": "long" },
          "duration": { "type": "long" },
          "textSegments": {
            "type": "nested",  // Set textSegments to be of type nested
            "properties": {
              "offsetTime": { "type": "long" },
              "utf8": {
                "type": "text",
                "fields": {
                  "keyword": { "type": "keyword", "ignore_above": 256 }
                }
              }
            }
          }
        }
      }
    }
  }
};

fetch('http://localhost:9200/captions', { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
  .then(response => response.text())
  .then(console.log);