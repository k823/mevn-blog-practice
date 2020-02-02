// Valida que el comentario no contiene palabras ofensivas 
const mongoose = require('mongoose');
const BannedWord = mongoose.model('BannedWord');

function slicePhrase(phrase) {
    const res = [];
    const words = phrase.split(' ');
    for(let i = 0; i < words.length; i++) {
        res.push(trimSpecialCharacters(words[i]));
    }
    return res;
};

function trimSpecialCharacters(word) {
    word = word.toUpperCase();
    let trimmedWord = '';
    for(let i = 0; i < word.length; i++) {
        const allowMayus = word.charCodeAt(i) >= 65
        && word.charCodeAt(i) <= 90;
        const allowNumbers = word.charCodeAt(i) >= 48
        && word.charCodeAt(i) <= 57;
        if(allowMayus || allowNumbers) {
            trimmedWord += word[i];
        }
    }

    return trimmedWord;
};

async function banner(phrase) {
    let slicedPhrase = slicePhrase(phrase);
    let badWords = await BannedWord.find({});
    let found = false;
    badWords.forEach(function(badWord) {
        slicedPhrase.forEach(function(word) {
            if(badWord.word.toUpperCase() === word) {
                found = true;
            }
        });
    });
    return found;
};

module.exports = banner;

