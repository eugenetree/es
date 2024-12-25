fetch('http://localhost:9200/captions/_search', {
  method: 'POST', // Use POST for Elasticsearch queries
  headers: {
    'Content-Type': 'application/json' // Set the content type to JSON
  },
  body: JSON.stringify({
    "query": {
    "nested": {
      "path": "captions.textSegments",
      "query": {
        "match_phrase": {
          "captions.textSegments.utf8": {
            "query": "I dropped off fiew women",
            "slop": 20
          }
        }
      }
    }
  },
  "_source": ["captions.textSegments", "captions.startTime", "captions.endTime"],
    "highlight": {
      "fields": {
        "textSegments.utf8": {}
      }
    }
  })
})
  .then(response => response.json()) // Parse the JSON response
  .then(data => console.log(JSON.stringify(data, null, 2))) // Log the data prettily
  .catch(error => console.error('Error:', error)); // Log any errors

  