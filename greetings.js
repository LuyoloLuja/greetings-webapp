module.exports = function GreetFactory(pool) {
    var storedValues = {};

    async function setNames(name) {

        if (name) {
            if (storedValues[name] === undefined) {
                storedValues[name] = 0;
                var data = await pool.query('SELECT * FROM users WHERE names = $1', [name]);

                if(data === 1){
                    await pool.query('UPDATE users names SET timesGreeted = timesGreeted + 1 WHERE names = $1', [name]);
                }else {
                    await pool.query('INSERT INTO users (names, timesGreeted) values ($1, $2)', [name, 1]);
                }
            }else{
                await pool.query('UPDATE users names SET timesGreeted = timesGreeted + 1 WHERE names = 1$', [name])

                storedValues[name]++
            }
        }
    }

    async function userInput(name, languageSelected) {

        var username = name.toUpperCase().charAt(0) + name.slice(1);

        if(username && languageSelected){
            if (languageSelected === "english") {
                return "Hi, " + username + "!";
            } else if (languageSelected === "afrikaans") {
                return "More, " + username + "!";
            } else if (languageSelected === "isixhosa") {
                return "Molo, " + username + "!";
            }
        }
    }

    function getNames() {
        return (storedValues);
    }

    function getCounter(name, language) {
        if(name && language){
            return Object.keys(storedValues).length;
        }
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
