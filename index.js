// importing middleware
let express = require("express");
let app = express();
const bodyParser = require("body-parser");
const exhbs = require("express-handlebars");
const flash = require("express-flash");
const session = require("express-session");

// importing database middleware
const pg = require('pg');
// const Pool = pg.Pool()

const GreetingsFactory = require("./greetings");
const greetingsFactory = GreetingsFactory();

// initialise the flash middleware
app.use(flash());

// configuring handlebars
app.engine("handlebars", exhbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// initialise session middleware - flash-express depends on it
app.use(
	session({
		secret: "<add a secret string here>",
		resave: false,
		saveUninitialized: true,
	})
);

// make public folder visible -- (a middleware)
app.use(express.static("public"));

// parse appliction
app.use(bodyParser.urlencoded({ extended: false }));

// parse application / json
app.use(bodyParser.json());

app.get("/", function (req, res) {
	res.render("index", {
	});
});

// display names
app.post("/greeting", function (req, res) {
	let displayName = req.body.name;
	let language = req.body.language;

	let greetings = greetingsFactory.userInput(displayName, language);
	greetingsFactory.setNames(displayName);
	let counter = greetingsFactory.getCounter(displayName, language);

	if (!displayName && !language) {
		req.flash("error", "Please enter your name and select a language!");
	} else if (!displayName) {
		req.flash("error", "Please enter your name!");
	} else if (!language) {
		req.flash("error", "Please select a language of your choice!");
	}
	res.render("index", {
		greet: greetings,
		timesGreeted: counter,
	});
});

app.get("/greeted", function (req, res) {
	var greetedNames = greetingsFactory.getNames();

	for (const list in greetedNames) {
	}

	res.render("greeted", {
		names: greetedNames,
	});
});
// getting counter for each person greeted
app.get("/counter/:user_name", function (req, res) {
	let username = req.params.user_name;

	res.render("persons", {
		timesGreeted: greetingsFactory.userTotals(username),
		username,
	});
});

app.post("/clear", function () {
	greetingsFactory.clearCounter();

	res.redirect("/");
})

// declaring my port number
let PORT = process.env.PORT || 1997;
app.listen(PORT, function () {
	console.log("App started on port:", PORT);
});
