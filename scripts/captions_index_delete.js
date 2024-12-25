fetch('http://localhost:9200/captions', { method: 'DELETE' })
  .then(response => response.text())
  .then(console.log);