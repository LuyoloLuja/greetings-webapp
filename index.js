const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exhbs = require("express-handlebars");
const flash = require("express-flash");
const session = require("express-session");

const Routes = require("./routes-factory");
const routes = Routes();

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

// make public folder visible
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.get("/", routes.renderHome);
app.post("/greeting", routes.displayUserInput);
app.get("/greeted", routes.greetedNames);
app.get("/counter/:user_name", routes.counterForOne);
app.get("/clear", routes.resetButton);

let PORT = process.env.PORT || 1997;
app.listen(PORT, function () {
	console.log("App started on port:", PORT);
});
