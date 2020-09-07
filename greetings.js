module.exports = function GreetFactory() {
    var storedValues = {};
    // var userName = "";
    
    function setNames(name){
        if(name){
        // var userName = name.toUpperCase().charAt(0) + name.toLowerCase().slice();
          if(storedValues[name] === undefined){
            storedValues[name] = 0;
          }
        storedValues[name]++
        }
    }
    
    function userInput(name, languageSelected) {

//   var userName = name.toUpperCase().charAt(0) + name.slice();

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

    return {
        userInput,
        getCounter,
        getNames,
        setNames
    }
}
