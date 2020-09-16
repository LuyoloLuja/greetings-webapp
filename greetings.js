module.exports = function GreetFactory() {
    var storedValues = {};

    function setNames(name) {
        if (name) {
            if (storedValues[name] === undefined) {
                storedValues[name] = 0;
            }
            storedValues[name]++
        }
    }

    function userInput(name, languageSelected) {

        if (languageSelected === "english") {
            return "Hi, " + name + "!";
        } else if (languageSelected === "afrikaans") {
            return "More, " + name + "!";
        } else if (languageSelected === "isixhosa") {
            return "Molo, " + name + "!";
        }
    }

    function getNames() {
        return (storedValues);
    }

    function getCounter() {
        return Object.keys(storedValues).length;
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
        storedValues = "";
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
