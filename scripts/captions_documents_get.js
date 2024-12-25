fetch('http://localhost:9200/captions/_search', { 
  body: JSON.stringify({ query: { match_all: {} }, size: 100 }),
  headers: {
    'Content-Type': 'application/json'},
  method: 'POST' 
}).then(response => response.json()).then((data) => console.log(JSON.stringify(data, null, 2)));