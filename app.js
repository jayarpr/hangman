//create the JSON dataset

//RAndomise the selection

//show the key board

//on click - 
//  if pressed key is not present in the word, play sound, start displaying hangman part by partpic
//  if pressed key is found, fill in the placeholders for the letters

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
let selectedWordArray = [];
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

//create placeholder for a random word
const createRandomWord = () => {
    
    const random = Math.floor(Math.random() * data[0].words.length);
    selectedWordArray = (data[0].words[random].toUpperCase()).split("");

    console.log('selectedWordArray', selectedWordArray);

    document.querySelector('.words').innerHTML = ''; //Remove all child nodes
    let textValue = "___";
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

const getAllIndexes = (arr, val) => {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1) {
        indexes.push(i);
    }
    return indexes;
}

const checkLetter = (char) => {
    //check for char in the array
    let indexes = getAllIndexes(selectedWordArray, char);
    console.log('indexes', indexes, char);
    // if no char is found, start displaying the hangman
    // when full hangman is displayed, end the game and display 'you lost'
    // if the word is found within the limit of hangman, then display 'you won'
}

document.addEventListener('DOMContentLoaded', (event) => {
    
    document.addEventListener('click', (event) => {
        var element = event.target;

        console.log('element',element.tagName, element.className, element.id);

        if (element.tagName !== 'BUTTON'){       
            return;
        }
        if (element.id === "btnPlay") {         
            createRandomWord();
            return;
        }

        if (element.tagName === "BUTTON" && /btn_letter/.test(element.className)) {
            console.log('btnclicked', element.innerHTML);
            checkLetter(element.innerHTML);
        }
    });
});
createButtons();
// createRandomWord()

