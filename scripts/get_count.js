fetch('http://localhost:9200/video_captions/_count')
  .then(response => response.json())
  .then(data => console.log(data));