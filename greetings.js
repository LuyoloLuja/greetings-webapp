module.exports = function GreetFactory(pool) {

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
        if (name) {
            var setNames = await pool.query('SELECT names FROM users WHERE names = $1', [name]);

            if (setNames.rowCount === 0) {
                await pool.query('INSERT INTO users (names, timesGreeted) values ($1, $2)', [name, 1]);

            } else {
                await pool.query('UPDATE users names SET timesGreeted = timesGreeted + 1 WHERE names = $1', [name]);
            }
        }
    }

    async function getNames() {
        let storedNames = await pool.query('SELECT names FROM users');
        return storedNames.rows;
    }

    async function getCounter() {
        let counter = await pool.query('SELECT timesGreeted FROM users');
        return counter.rowCount;
    }

    async function userTimesGreeted(name) {
        let personCounter = await pool.query('SELECT timesGreeted FROM users WHERE names = $1', [name]);

        if (personCounter.rowCount === 1) {
            return personCounter.rows[0].timesgreeted;
        } else {
            return 0;
        }
    }

    async function clearCounter() {
        await pool.query('delete from users');
    }

    return {
        userInput,
        getCounter,
        getNames,
        setNames,
        userTimesGreeted,
        clearCounter
    }
}