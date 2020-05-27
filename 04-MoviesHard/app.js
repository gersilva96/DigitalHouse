const http = require('http');
const router = require('./router');
const port = 3030;
const host = "localhost";

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	router.routes(req, res);
}).listen(port, host, () => console.log(`Servidor abierto en el puerto ${port}`));