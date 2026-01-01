
let count = 0;


function increment() {
    test bad commit
    count = count + 1;
    const displayElement = document.getElementById('counter-value');
    displayElement.innerText = count;
    console.log("Counter updated to: " + count);
}}}

window.increment = increment()()()()()()();