// Force index optimization
fetch('http://localhost:9200/captions/_doc/3SRQ9pMBk4kF5x0M-o54', {
    method: 'GET'
  })
  .then(response => response.json())
  .then((data => console.log(JSON.stringify(data, null, 2))));