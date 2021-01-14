class Calculator {
	constructor(inputScreenTextElement, expressionScreenTextElement) {
		this.expressionScreenTextElement = expressionScreenTextElement;
		this.inputScreenTextElement = inputScreenTextElement;
		this.zeroScreens();
	}
	zeroScreens() {
		this.inputScreenTextElement.innerText = '0';
		this.inputScreenText = '';
		this.expressionScreenTextElement.innerText = '0';
		this.expressionScreenText = '';
		this.evaluation = undefined;
		this.op = undefined;
		this.lastWasOp = undefined;
		this.noMoreOps = false;
	}
	zeroInputScreen() {
		this.inputScreenTextElement.innerText = '0';
		this.inputScreenText = '';
	}
	appendNumber(number) {
		if (!isNaN(parseFloat(number)) && this.noMoreOps === true) {
			this.noMoreOps = false;
			this.lastWasOp = false;
		}
		if (isNaN(parseFloat(number)) && this.noMoreOps === true) {
			this.expressionScreenText = this.expressionScreenText.toString().slice(0, -1) + number.toString();
			return;
		}

		if (this.evaluation !== undefined) this.zeroScreens();
		if (number === '.' && this.inputScreenText.includes('.')) return;
		// if (this.inputScreenText.indexOf('0') === 0) {
		// 	this.inputScreenText.slice(1);
		// 	return;
		// }
		this.expressionScreenText = this.expressionScreenText.toString() + number.toString();
		this.inputScreenText = this.inputScreenText.toString() + number.toString();
		if (this.lastWasOp) this.noMoreOps = true;

		if (!this.lastWasOp) this.noMoreOps = false;
	}
	chooseOp(op) {
		if (this.evaluation !== undefined) this.expressionScreenText = this.evaluation;
		this.op = op;
		if (this.evaluation) this.expressionScreenText = this.evaluation;
		this.evaluation = undefined;
		this.lastWasOp = true;
	}
	evaluate() {
		this.evaluation = Math.round(eval(this.expressionScreenText) * 10000000000) / 10000000000;
		this.inputScreenText = this.evaluation.toString();
	}
	updateDisplay() {
		if (this.evaluation !== undefined) {
			this.expressionScreenTextElement.innerText = `${this.expressionScreenText}=`;
			this.inputScreenTextElement.innerText = this.inputScreenText;
			return;
		}
		this.expressionScreenTextElement.innerText = this.expressionScreenText;
		this.inputScreenTextElement.innerText = this.inputScreenText;
	}
}
const expressionScreenTextElement = document.getElementById('expression-screen');
const inputScreenTextElement = document.getElementById('output-screen');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-op]');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

const calculator = new Calculator(inputScreenTextElement, expressionScreenTextElement);

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
//allow subtraction of negatives
