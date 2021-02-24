//create the JSON dataset
const data = [
    {
        theme: "country",
        words: ['norway', 'Czech Republic', 'tokyo', 'Costa Rica', 'Saudi Arabia', 'South Africa', 'Zimbabwe', 'ivory coast', 'Equador', 'iceland', 'austria', 'france', 'New York']
    },
//   {
//     theme: "famous-people",
//     words: ['Barack Obama', 'Donald Trump', 'Elon Musk', 'Jeff Bezos', 'Mahatma Gandhi']
//   }
];

//Global variables
let selectedWordArray = [];
let guessedWord = [];
let noOfAttempts = 6; //one head + 1 body + 2 hands + 2 legs of hangman
let attempt = 0;

//Randomise the selection of word
const createRandomWord = () => {
    let textValue = "___";
    const random = Math.floor(Math.random() * data[0].words.length);
    selectedWordArray = (data[0].words[random].toUpperCase()).split("");

    console.log('selectedWordArray', selectedWordArray);

    document.querySelector('.words').innerHTML = ''; //Remove all child nodes
    
    for(let i=0; i < selectedWordArray.length; i++) {    
        textValue = "___";
        const divElement = document.createElement('div');
        divElement.id = 'div-char-' + i;
        
        if (selectedWordArray[i] === ' ') {
            textValue = ' ';
            guessedWord[i] = textValue; //add the space to guessedWord as user won't type space
        }
        divElement.appendChild(document.createTextNode(textValue));    
        document.querySelector('.words').appendChild(divElement);
    }    
}

//show the key board
const createButtons = () => {
    for (i = 0; i < 26; i++) {
        var button = document.createElement("button");
        button.innerHTML = ((i+10).toString(36) + " ").toUpperCase();
        button.style.listStyle = "none";
        button.style.display = "inline";
        button.classList.add('btn_letter');
        document.getElementById("letters").appendChild(button);
    }
}

//disable / enable buttons when game is finised or started resp
const enableDisableLetters = (enableDisable) => {
    let letterArray = document.getElementsByClassName('btn_letter');   

    for(let i=0; i< letterArray.length; i++)
        letterArray[i].disabled = enableDisable;
}

//Get the indexes of the character found in the selectedWordArray
const getAllIndexes = (arr, val) => {
    var indexes = [], i = 0;
    let index = 0;

    while(i < arr.length ) {     
        index = arr.indexOf(val.trim(), i);
        if(index !== -1 && (!indexes.includes(index))) {
            indexes.push(index);     
        }            
        i++;
    }
    return indexes;
}

const drawHangMan = (number) => {
    document.getElementById('hangman-' + number).style.display = 'block';
    // var audio = new Audio('chimes.wav');
    // audio.play();
}

const clearHangMan = () => {
    let element = document.getElementsByClassName('hangman__fig')[0];

    for (let i = 0; i < element.children.length; i++) {
        element.children[i].style.display = 'none';
    }
}

//Check if the letter pressed is found in the selectedWordArray and draw the hangman
const checkLetter = (char, attempt) => {
    //check for char in the array
    let indexes = getAllIndexes(selectedWordArray, char);
    // console.log('indexes', indexes, char);

    if (indexes.length > 0) {
        indexes.forEach(index => {
            document.getElementById('div-char-' + index).innerHTML = char;
            guessedWord[index] = char;
        });
        // console.log('guessedWord', guessedWord);
    
        if(guessedWord.join("") === selectedWordArray.join("")) {
            displayResult("Congrats, Well Played! Click Play New to play again!!", "green");
            enableDisableLetters(true);
        }

        return true;
    } else {
        // if no char is found, start displaying the hangman
        drawHangMan(attempt);
        if(attempt === noOfAttempts) {
            displayResult("Better Luck Next time! Click Play New to play again!!", "red");
            enableDisableLetters(true);
        }
            
        return false;
    }
    return true;

}

const displayResult = (message, color) => {
    let element = document.getElementsByClassName('result')[0];
    element.innerHTML = message;
    element.style.color = color;
}

const playNewGame = () => {
    //Re-initialize all variables and create a new random word to guess
    attempt = 0; 
    guessedWord = [];
    clearHangMan();          
    displayResult("",'white');
    createRandomWord();
    enableDisableLetters(false);
}

//On click events
document.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('click', (event) => {
        var element = event.target;

        // console.log('element',element.tagName, element.className, element.id);

        if (element.tagName !== 'BUTTON'){       
            return;
        }
        if (element.id === "btnPlay") {
            playNewGame();
            return;
        }

        if (element.tagName === "BUTTON" && /btn_letter/.test(element.className)) {
            // console.log('btnclicked', element.innerHTML);
     
            if (noOfAttempts > attempt) {
                if (!checkLetter(element.innerHTML.trim(), attempt+1)) 
                    attempt++;        
            } 
        }
    });
});

window.addEventListener('load', (event) => {
    //create the buttons of Letters
    createButtons();
 });



