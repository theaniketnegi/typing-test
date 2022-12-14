const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

let words = []; //store words of one of the quotes
let wordIndex = 0;
let startTime = Date.now();
let keystrokes = 0;
let incorrectStrokes = 0;

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
typedValueElement.disabled=true;
const startButton = document.getElementById('start')

startButton.addEventListener('click',()=>{
    const quotesIndex = Math.floor(Math.random()*quotes.length);
    const quote = quotes[quotesIndex];

    words = quote.split(' ');
    wordIndex=0;

    const spanWords = words.map((word)=>{return `<span>${word} </span>`});
    quoteElement.innerHTML = spanWords.join('');
    quoteElement.childNodes[0].className='highlight';
    messageElement.innerText='';
    typedValueElement.disabled=false;
    typedValueElement.value='';
    typedValueElement.focus();
    startTime = new Date().getTime();
    startButton.disabled=true;
});

typedValueElement.addEventListener('input', ()=>{
    const currentWord = words[wordIndex]
    const typedValue = typedValueElement.value;
    keystrokes++;

    if(typedValue===currentWord && wordIndex == words.length-1){
        const elapsedTime = new Date().getTime()-startTime;
        const words=keystrokes/5;
        const wpm = (words/(elapsedTime/60000)).toFixed(2);
        const accuracy = (((keystrokes-incorrectStrokes)/keystrokes)*100).toFixed(2);
        const message=`WPM: ${wpm}/ACC: ${accuracy}%`;
        messageElement.innerText=message;
        typedValueElement.value=''
        typedValueElement.disabled=false;
        startButton.disabled=false;
        keystrokes=0;
        incorrectStrokes=0;
    }
    else if(typedValue.endsWith(' ') && typedValue.trim()===currentWord){
        typedValueElement.value='';
        wordIndex++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        quoteElement.childNodes[wordIndex].className='highlight';  
    }
    else if(currentWord.startsWith(typedValue)){
        typedValueElement.className='';
    }
    else{
        typedValueElement.className='error';
        incorrectStrokes++;
    }
})