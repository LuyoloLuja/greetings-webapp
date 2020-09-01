let express = require('express');
let app = express();

// importing handlebars
const exhbs = require('express-handlebars');
// configuring handlebars
app.engine('handlebars', exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// rendering the index greetings handlebars template
app.get('/', function(req, res){
	res.render('index');
})


app.get("/", function(req, res){
	res.send('Greetings Webapp');
})

let PORT = process.env.PORT || 1997;

app.listen(PORT, function(){
	console.log('App started on port:', PORT);
})