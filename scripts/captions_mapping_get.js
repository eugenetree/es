// fetch('http://localhost:9200/captions/_mapping')
//   .then(response => response.json())
//   .then(data => console.log(JSON.stringify(data, null, 2)));

fetch('http://localhost:9200/captions/_mapping', {method: 'PUT', headers: {
  'Content-Type': 'application/json'
},body: JSON.stringify({
  "properties": {
    "captions": {
      "properties": {
        "textSegments": {
          "type": "nested",
          "properties": {
            "utf8": {
              "type": "text"
            },
            "offsetTime": {
              "type": "long"
            }
          }
        }
      }
    }
  }
})})
  .then(response => response.json())
  .then(data => console.log(JSON.stringify(data, null, 2)));