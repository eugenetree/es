const url = 'http://localhost:9200/captions/_delete_by_query';
const method = 'POST';
const headers = { 'Content-Type': 'application/json' };
const body = JSON.stringify({ query: { match_all: {} } });

fetch(url, { method, body, headers })
  .then(response => response.text())
  .then(console.log);