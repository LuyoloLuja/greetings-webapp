module.exports = function GreetFactory(names) {
    var storedValues = names || {};
    var userName = "";

    async function userInput(name, languageSelected) {

        userName = name.toUpperCase().charAt(0) + userName.slice();

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

    async function getNames() {
        return storedValues;
    }

    async function getCounter() {
        return Object.keys(storedValues).length;
    }

    /*async function errorHandler(username, language){
      if(!username && !language){
        return "Please enter your name and select a language!";
      }else if(!username){
        return "Please enter your name!";
      }else if (!language) {
        return "Please select a language!";
      }
    }*/

    return {
        userInput,
    //    setNames,
        getCounter,
        getNames,
    //    errorHandler
    }
}
