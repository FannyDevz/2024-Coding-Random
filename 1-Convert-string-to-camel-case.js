//https://www.codewars.com/kata/517abf86da9663f1d2000003/solutions/javascript


function toCamelCase(s) {
    var words = s.replace(/[-_]/g, '_').split('_');
    var camelCaseWords = [words[0]];

    for (var i = 1; i < words.length; i++) {
        camelCaseWords.push(words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase());
    }

    return camelCaseWords.join('');
}

// Examples
console.log(toCamelCase("the-stealth-warrior"));  // Output: "theStealthWarrior"
console.log(toCamelCase("The_Stealth_Warrior"));  // Output: "TheStealthWarrior"
console.log(toCamelCase("The_Stealth-Warrior"));  // Output: "TheStealthWarrior"
