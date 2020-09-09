// importing middleware
let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');

const GreetingsFactory = require('./greetings');
const greetingsFactory = GreetingsFactory();

// initialise session middleware - flash-express depends on it
app.use(session({
	secret: "<add a secret string here>",
	resave: false,
	saveUninitialized: true
}));
// initialise the flash middleware
app.use(flash());

// configuring handlebars
app.engine('handlebars', exhbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// make public folder visible -- (a middleware)
app.use(express.static('public'));

// parse appliction
app.use(bodyParser.urlencoded({ extended: false }))

// parse application / json
app.use(bodyParser.json());

// my routes
// rendering the home directory
app.get('/', function (req, res) {

	let counter = greetingsFactory.getCounter();

	res.render('index', {
	});
})

// display names
app.post('/', function (req, res) {

	let displayGreetings = req.body.name;
	let language = req.body.language;

	greetingsFactory.setNames(displayGreetings)

	let greetings = greetingsFactory.userInput(displayGreetings, language);
	let counter = greetingsFactory.getCounter();

	res.render('index', {
		greet: greetings,
		count: counter
	});
})

app.get('/greeted', function (req, res) {

	//console.log(greetingsFactory.getNames())
	var greetedNames = greetingsFactory.getNames();

	for(const list in greetedNames){

	}

	res.render('greeted', {
	//	greeted: greetingsFactory.getNames();
		names: greetedNames
	});
})

app.get('/greeted/:type', function (req, res) {
	var name = req.params.type;
	var namesList = greetingsFactory.getNames()
	var sentence = 'You have greeted ' + namesList;

	res.render('persons', {
		times: sentence
	})
})

// declaring my port number
let PORT = process.env.PORT || 1997;
app.listen(PORT, function () {
	console.log('App started on port:', PORT);
})

