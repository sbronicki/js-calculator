const clear = document.getElementById('clear');
const division = document.getElementById('divide');
const multiplication = document.getElementById('multiply');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const minus = document.getElementById('minus');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const plus = document.getElementById('plus');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const equals = document.getElementById('equals');
const zero = document.getElementById('zero');
const decimal = document.getElementById('decimal');
const formulaScreen = document.getElementById('formula-screen');
const outputScreen = document.getElementById('output-screen');

// *** formula screen display *** //
let allowDecimal = true;
let allowOp = true;

document.addEventListener('click', () => {
	console.log(allowOp);
	//clear function
	if (event.target.classList.contains('clear')) {
		clearScreen();
	}
	// one decimal check
	if (!allowDecimal && event.target.classList.contains('decimal')) return;
	if (event.target.classList.contains('decimal')) allowDecimal = false;
	// check if last entry was an operation
	if (!allowOp && event.target.classList.contains('operations')) return;
	if (event.target.classList.contains('operations')) {
		allowOp = false;
		formulaScreen.innerText += event.target.innerText;
	}
	// display nums and ops on formula screen
	if (event.target.classList.contains('num')) {
		formulaScreen.innerText += event.target.innerText;
		allowOp = true;
	}
});

const clearScreen = () => {
	formulaScreen.innerText = '';
	outputScreen.innerText = '';
};
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
