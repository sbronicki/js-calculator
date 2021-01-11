class Calculator {
	constructor(outputScreenTextElement, formulaScreenTextElement) {
		this.formulaScreenTextElement = formulaScreenTextElement;
		this.outputScreenTextElement = outputScreenTextElement;
		this.zeroScreen();
	}
	formulaScreenText = '';
	outputScreenText = '';
	outputScreen = '';
	inputCount = 0;
	inputLimit = 12;
	inputArray = [];
	inputResult;

	zeroScreen() {
		this.formulaScreenTextElement.innerText = '0';
		this.outputScreenTextElement.innerText = '0';
		this.op = undefined;
		this.formulaScreenText = '';
		this.outputScreenText = '';
		this.inputCount = 0;
		this.inputArray = [];
	}
	zeroOutputScreen() {
		this.outputScreenTextElement.innerText = '0';
		this.outputScreenText = '';
	}
	appendEntry(entry) {
		if (this.inputCount === this.inputLimit) return;

		if (entry === '.' && this.outputScreen.includes('.')) return;
		this.formulaScreenText += entry.toString();
		this.outputScreenText += entry.toString();
		this.inputCount++;
	}
	chooseOp(op) {
		// need if to see if last entry was op if so switch op
		if (this.formulaScreenText.indexOf(op) !== -1) console.log('yes');

		this.op = op;
		this.inputArray.push(parseFloat(this.outputScreenText));
		this.inputArray.push(this.op);
	}
	evaluate() {
		this.inputArray.push(parseFloat(this.outputScreenText));
		this.inputResult = this.inputArray.join('');
		let finalResult = eval(this.inputResult);
		this.inputArray = [];
		this.inputResult = [];
		console.log(finalResult);
		this.outputScreenText = finalResult;
	}
	updateDisplay() {
		this.formulaScreenTextElement.innerText = this.formulaScreenText;
		this.outputScreenTextElement.innerText = this.outputScreenText;
	}
}
const formulaScreenTextElement = document.getElementById('formula-screen');
const outputScreenTextElement = document.getElementById('output-screen');
const numbers = document.querySelectorAll('[data-number]');
const numsAndOps = document.querySelectorAll('[data-on-screen]');
const op = document.querySelectorAll('[data-op]');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

const calculator = new Calculator(outputScreenTextElement, formulaScreenTextElement);

numbers.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.appendEntry(button.innerText);
		calculator.updateDisplay();
	});
});
op.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.chooseOp(button.innerText);
		calculator.appendEntry(button.innerText);
		calculator.updateDisplay();
		calculator.zeroOutputScreen();
	});
});
clear.addEventListener('click', () => {
	calculator.zeroScreen();
});

equals.addEventListener('click', (button) => {
	calculator.evaluate();
	calculator.updateDisplay();
});

// still need to
// set char limit error message
// handle output when char limit reach (#e^n notation)
// keep zero infront of decimal if op was last entry
// changing op
// nagative number inputs
// template row minmax handle infitite expression
