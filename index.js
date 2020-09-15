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

	let displayName = req.body.name;
	let language = req.body.language;

	let username = displayName.toUpperCase().charAt(0) + displayName.slice();

	let greetings = greetingsFactory.userInput(username, language);
	greetingsFactory.setNames(username)
	let counter = greetingsFactory.getCounter();

	if (!username) {
		req.flash('error', 'Please enter your name!');
	} else if (!language) {
		req.flash('error', 'Please select a language of your choice!');
	} else if (!username && !language) {
		req.flash('error', 'Please enter your name and select a language!')
	} else {
		res.render('index', {
			greet: greetings,
			count: counter
		});
	}
})

app.get('/greeted', function (req, res) {

	var greetedNames = greetingsFactory.getNames();

	for (const list in greetedNames) {

	}

	res.render('greeted', {
		names: greetedNames
	});
})
// getting counter for each person greeted
app.get('/counter/:user_name', function (req, res) {
	let name = req.params.user_name;

	res.render('persons', {
		count: greetingsFactory.userTotals(name),
		name,
	})
})

// declaring my port number
let PORT = process.env.PORT || 1997;
app.listen(PORT, function () {
	console.log('App started on port:', PORT);
})

