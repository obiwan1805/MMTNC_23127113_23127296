
let count = 0;


function increment() {
    count = count + 1;
    const displayElement = document.getElementById('counter-value');
    displayElement.innerText = count;
    console.log("Counter updated to: " + count);
    console.logggggg("abc");
}

window.increment = increment;