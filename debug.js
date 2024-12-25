fetch('http://localhost:9200')
	.then(response => response.text())
	.then(text => console.log(text));