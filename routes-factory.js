module.exports = function routes() {
    // app.use(bodyParser.urlencoded({ extended: false }));

    async function renderHome(req, res) {
        res.render("index");
    }

    async function displayUserInput(req, res) {

        try {
            let displayName = req.body.name;
            let language = req.body.language;

            displayName = displayName.toLowerCase();

            if (!displayName && !language) {
                req.flash("error", "Please enter your name and select a language!");
            } else if (!displayName) {
                req.flash("error", "Please enter your name!");
            } else if (!language) {
                req.flash("error", "Please select a language of your choice!");
            }
            else if (displayName && language) {
                await greetingsFactory.setNames(displayName);
                var greetings = await greetingsFactory.userInput(displayName, language);
                var counter = await greetingsFactory.getCounter(displayName, language);
            }
            res.render("index", {
                greet: greetings,
                timesGreeted: counter,
            });
        } catch (err) {
            console.log(err)
        }
    }

    async function greetedNames(req, res) {
        var greetedNames = await greetingsFactory.getNames();

        res.render("greeted", {
            names: greetedNames
        });
    }

    async function counterForOne(req, res) {
        let names = req.params.user_name;

        res.render("persons", {
            timesGreeted: await greetingsFactory.userTimesGreeted(names),
            names,
        });
    }

    async function resetButton(req, res) {
        await greetingsFactory.clearCounter();

        res.redirect("/");
    }

    return {
        displayUserInput,
        greetedNames,
        counterForOne,
        resetButton,
        renderHome
    }
}