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

let allowDecimal = true;
let allowOp = true;
let allowClear = true;
const inputLimit = 16;
let inputCount = 0;
let isFirstEntry = true;
let isFirstOutput = true;

// *** formula screen display *** //
document.addEventListener('click', () => {
	// clear function
	if (isFirstEntry) {
		clearFormula();
		clearOutput();
		isFirstEntry = false;
	}
	if (isFirstOutput) {
		clearOutput();
		isFirstOutput = false;
	}
	if (event.target.classList.contains('clear')) {
		allowDecimal = true;
		allowOp = true;
		inputCount = 0;
		isFirstEntry = true;
		zeroScreen();
	}

	// check input count
	if (inputCount === inputLimit) {
		//disable button to avoid further input after limit reached
		// document.querySelectorAll('button').disabled = true;
		let entry = outputScreen.innerText;
		outputScreen.innerText = 'Input limit reached';
		setTimeout(() => {
			outputScreen.innerText = entry;
		}, 2000);
		return;
	}

	// one decimal check
	if (!allowDecimal && event.target.classList.contains('decimal')) return;
	if (event.target.classList.contains('decimal')) allowDecimal = false;

	// check if last entry was an operation
	if (!allowOp && event.target.classList.contains('operations')) return;
	if (event.target.classList.contains('operations')) {
		allowOp = false;
		isFirstEntry = false;
		formulaScreen.innerText += event.target.innerText;
		inputCount++;
		zeroOutput();
		isFirstOutput = true;
	}
	// display nums on screen

	if (event.target.classList.contains('num')) {
		formulaScreen.innerText += event.target.innerText;
		outputScreen.innerText += event.target.innerText;
		allowOp = true;
		inputCount++;
	}
});

// equals listener
document.addEventListener('click', () => {
	if (event.target.classList.contains('equals')) {
		const input = formulaScreen.innerText;

		const separators = [ ' ', '\\+', '-', '\\(', '\\)', '\\*', '/', ':', '\\?' ];

		const inputArr = input.split(new RegExp(separators.join('|'), 'g'));

		inputArr.forEach((number) => {
			parseFloat(number);
		});
		console.log(inputArr);
	}
});

const zeroScreen = () => {
	formulaScreen.innerText = '0';
	outputScreen.innerText = '0';
};
const clearFormula = () => {
	formulaScreen.innerText = '';
};
const clearOutput = () => {
	outputScreen.innerText = '';
};
const zeroOutput = () => {
	outputScreen.innerText = '0';
};
