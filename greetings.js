module.exports = function GreetFactory(names) {
    var storedValues = names || {};
    var userName = "";

    function userInput(name, languageSelected) {

        userName = name.toUpperCase().charAt(0) + name.slice();

        if (languageSelected === "english") {
            return "Hi, " + userName + "!";
        } else if (languageSelected === "afrikaans") {
            return "More, " + userName + "!";
        } else if (languageSelected === "isixhosa") {
            return "Molo, " + userName + "!";
        }

        if (userName) {
            if (storedValues[userName] === undefined) {
                storedValues[userName] = 0;
            }
        }

    }

    function getNames() {
        return storedValues;
    }

    async function getCounter() {
        return Object.keys(storedValues).length;
    }

    return {
        userInput,
        getCounter,
        getNames,
    }
}
