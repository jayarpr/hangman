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
let noOfAttempts = 6;

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
        
        if (selectedWordArray[i] === ' ')
            textValue = ' ';
        
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

//Check if the letter pressed is found in the selectedWordArray and draw the hangman
const checkLetter = (char, attempt) => {
    //check for char in the array
    let indexes = getAllIndexes(selectedWordArray, char);
    console.log('indexes', indexes, char);

    if (indexes.length > 0) {
        indexes.forEach(index => {
            document.getElementById('div-char-' + index).innerHTML = char;
        })
        return true;
    } else {
        // if no char is found, start displaying the hangman
        drawHangMan(attempt);
        return false;
    }
    return true;

}

const displayResult = (message, color) => {
    let element = document.getElementsByClassName('result')[0];
    element.innerHTML = message;
    element.style.color = color;
}

//On click events
document.addEventListener('DOMContentLoaded', (event) => {
    let attempt = 0;
    console.log('loaded1');
    document.addEventListener('click', (event) => {
        var element = event.target;

        console.log('element',element.tagName, element.className, element.id);

        if (element.tagName !== 'BUTTON'){       
            return;
        }
        if (element.id === "btnPlay") {         
            createRandomWord();
            attempt = 0;
            displayResult("",'white');
            return;
        }

        if (element.tagName === "BUTTON" && /btn_letter/.test(element.className)) {
            // console.log('btnclicked', element.innerHTML);
            
            if (noOfAttempts > attempt) {
                if (!checkLetter(element.innerHTML, attempt+1)) 
                    attempt++;
                    console.log("attempt", attempt);
            } else {
                displayResult("Better Luck Next time! You have lost!!", "red");
            };
        }
    });
});

window.addEventListener('load', (event) => {
    //create the buttons of Letters
    createButtons();
 });



