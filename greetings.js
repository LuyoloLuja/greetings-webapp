module.exports = function GreetFactory(names) {
    var storedValues = names || {};

    function userInput(userName, languageSelected) {
        if (languageSelected === "english") {
            return "Hi, " + userName + "!";
        } else if (languageSelected === "afrikaans") {
            return "More, " + userName + "!";
        } else if (languageSelected === "isixhosa") {
            return "Molo, " + userName + "!";
        }
    }

    function setNames(theName) {
        if (theName) {
            if (storedValues[theName] === undefined) {
                storedValues[theName] = 0;
            }
        }
    }

    function errorHandler(username, language){
      if(!username && !language){
        return "Please enter your name and select a language!";
      }else if(!username){
        return "Please enter your name!";
      }else if (!language) {
        return "Please select a language!";
      }
    }

    function getNames() {
        return storedValues;
    }

    function getCounter() {
        return Object.keys(storedValues).length;
    }

    return {
        userInput,
        setNames,
        getCounter,
        getNames,
        errorHandler
    }
}
