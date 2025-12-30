
let count = 0;

hehehhe this is a bad commit luuquangngu

function increment() {
    count = count + 1;
    const displayElement = document.getElementById('counter-value');
    displayElement.innerText = count;
    console.log("Counter updated to: " + count);
}

window.increment = increment;