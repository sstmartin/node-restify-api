var restify = require('restify');
var mongojs = require('mongojs');

//Database Server (Change to whatever your created mongodb instance was)
var db = mongojs('mongodb://admin:admin@ds053937.mongolab.com:53937/testapi',['products'])

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/products', function(req, res, next) {
	db.products.find(function(err, products) {
		res.writeHead(200, {
			'Content-Type':'application/json; charset=utf-8'
		});
		res.end(JSON.stringify(products));
	});
	return next();
});

server.post('/product', function(req, res, next) {
	var products = req.params;
	db.products.save(product, 
		function(err, data) {
			res.writeHead(200, {
				'Content-Type':'application/json; charset=utf-8'
			});
			res.end(JSON.stringify(data))
		});
	return next();
});

server.listen(3000, function() {
	console.log('Server started @ 3000');
});