fetch('http://localhost:9200/_cat/indices?v')
  .then(response => response.text())
  .then(console.log);