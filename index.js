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
	secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));
// initialise the flash middleware
app.use(flash());

// configuring handlebars
app.engine('handlebars', exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// make public folder visible -- (a middleware)
app.use(express.static('public'));

// parse appliction
app.use(bodyParser.urlencoded({ extended: false }))

// parse application / json
app.use(bodyParser.json());

// my routes
// rendering the home directory
app.get('/', async function(req, res){
	res.render('index');
})

// display names
app.post('/addNames', async function(req, res){

	let enteredName = req.body.name;
	let language = req.body.lang;



	res.redirect('/');
})



// declaring my port number
let PORT = process.env.PORT || 1997;
app.listen(PORT, function(){
	console.log('App started on port:', PORT);
})