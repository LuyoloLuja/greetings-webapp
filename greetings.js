module.exports = function GreetFactory(pool) {
    var storedValues = {};

    function userInput(name, languageSelected) {

        var username = name.toUpperCase().charAt(0) + name.slice(1);

        if (username && languageSelected) {
            if (languageSelected === "english") {
                return "Hi, " + username + "!";
            } else if (languageSelected === "afrikaans") {
                return "More, " + username + "!";
            } else if (languageSelected === "isixhosa") {
                return "Molo, " + username + "!";
            }
        }
    }
    async function setNames(name) {

        var setNames = await pool.query('SELECT names FROM users WHERE names = $1', [name]);
        console.log(setNames.rowCount);
        if (setNames.rowCount === 0) {
            await pool.query('INSERT INTO users (names, timesGreeted) values ($1, $2)', [name, 1]);

        } else {
            await pool.query('UPDATE users names SET timesGreeted = timesGreeted + 1 WHERE names = $1', [name]);
        }

    }

    async function getNames(name) {
        let storedNames = await pool.query('SELECT * FROM users WHERE names = $1', [name]);
        return storedNames;
    }

    async function getCounter() {
        let counter = await pool.query('SELECT timesGreeted FROM users');
        return counter.rowCount;
    }

    function userTotals(name) {
        for (var key in storedValues) {
            if (key === name) {
                var num = storedValues[key];
            }
        }
        return num;
    }

    function clearCounter() {
        storedValues = {};
    }

    return {
        userInput,
        getCounter,
        getNames,
        setNames,
        userTotals,
        clearCounter
    }
}