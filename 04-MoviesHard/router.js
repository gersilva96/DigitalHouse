const content = require('./src');

module.exports = {
	routes: (req, res) => {
		switch (req.url) {
			case '/':
				res.end(content.home);
				break;
			case '/en-cartelera':
				res.end(content.enCartelera);
				break;
			case '/mas-votadas':
				res.end(content.masVotadas);
				break;
			case '/sucursales':
				res.end(content.sucursales);
				break;
			case '/contacto':
				res.end(content.contacto);
				break;
			case '/preguntas-frecuentes':
				res.end(content.faqs);
				break;
			default:
				res.end('404 not found');
		}
	}
}