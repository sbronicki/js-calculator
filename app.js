class Calculator {
	constructor(inputScreenTextElement, formulaScreenTextElement) {
		this.formulaScreenTextElement = formulaScreenTextElement;
		this.inputScreenTextElement = inputScreenTextElement;
		this.zeroScreens();
	}
	zeroScreens() {
		this.inputScreenTextElement.innerText = '0';
		this.inputScreenText = '';
		this.formulaScreenTextElement.innerText = '0';
		this.formulaScreenText = '';
		this.evaluation = undefined;
		this.op = undefined;
	}
	zeroInputScreen() {
		this.inputScreenTextElement.innerText = '0';
		this.inputScreenText = '';
	}
	appendNumber(number) {
		if (this.evaluation) this.zeroScreens();

		if (number === '.' && this.inputScreenText.includes('.')) return;

		this.formulaScreenText = this.formulaScreenText.toString() + number.toString();
		this.inputScreenText = this.inputScreenText.toString() + number.toString();
	}
	chooseOp(op) {
		this.op = op;
		if (this.evaluation) this.formulaScreenText = this.evaluation;
		this.evaluation = undefined;
	}
	evaluate() {
		this.evaluation = Math.round(eval(this.formulaScreenText) * 10000000000) / 10000000000;
		this.inputScreenText = this.evaluation.toString();
	}
	updateDisplay() {
		if (this.evaluation) {
			this.formulaScreenTextElement.innerText = `${this.formulaScreenText}=`;
			this.inputScreenTextElement.innerText = this.inputScreenText;
			return;
		}
		this.formulaScreenTextElement.innerText = this.formulaScreenText;
		this.inputScreenTextElement.innerText = this.inputScreenText;
	}
}
const formulaScreenTextElement = document.getElementById('formula-screen');
const inputScreenTextElement = document.getElementById('output-screen');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-op]');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

const calculator = new Calculator(inputScreenTextElement, formulaScreenTextElement);

numbers.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});
operators.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.chooseOp(button.innerText);
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
		calculator.zeroInputScreen();
	});
});
clear.addEventListener('click', () => {
	calculator.zeroScreens();
});

equals.addEventListener('click', () => {
	calculator.evaluate();
	calculator.updateDisplay();
});

//cant put starting zeros
//cant put multiple ops
//exception: double minus
