let express = require('express');
let app = express();
const bodyParser = require('body-parser');

const GreetingsFactory = require('./greetings');
const greetingsFactory = GreetingsFactory();

// declaring my port number
let PORT = process.env.PORT || 1997;
app.listen(PORT, function(){
	console.log('App started on port:', PORT);
})

// importing handlebars
const exhbs = require('express-handlebars');
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
app.get('/greetings', async function(req, res){
	res.send('Hello')
})