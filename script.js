// class Calculator {
// 	constructor(outputScreenTextElement, formulaScreenTextElement) {
// 		this.formulaScreenTextElement = formulaScreenTextElement;
// 		this.outputScreenTextElement = outputScreenTextElement;
// 		this.zeroScreen();
// 	}
// 	formulaScreenText = '';
// 	outputScreenText = '';
// 	outputScreen = '';
// 	inputCount = 0;
// 	inputLimit = 100;
// 	outputLimit = 13;
// 	outputCount = 0;
// 	inputArray = [];
// 	inputResult;

// 	zeroScreen() {
// 		this.formulaScreenTextElement.innerText = '0';
// 		this.outputScreenTextElement.innerText = '0';
// 		this.op = undefined;
// 		this.formulaScreenText = '';
// 		this.outputScreenText = '';
// 		this.inputCount = 0;
// 		this.inputArray = [];
// 	}
// 	zeroOutputScreen() {
// 		this.outputScreenTextElement.innerText = '0';
// 		this.outputScreenText = '';
// 	}
// 	appendEntry(entry) {
// 		if (this.inputCount === this.inputLimit) {
// 			this.outputScreenText = 'Char limit';
// 			// setTimeout(() => {
// 			// 	this.outputScreenText = 'Char limit';
// 			// }, 2000);
// 			return;
// 		}
// 		if (entry === '.' && this.outputScreen.includes('.')) return;
// 		// negative nums
// 		// if (
// 		// 	this.inputArray[this.inputCount] === '-' &&
// 		// 	this.formulaScreenText.indexOf('-') === this.formulaScreenText.length()
// 		// ) {
// 		// 	console.log('double negative');
// 		// 	this.inputArray.pop();
// 		// 	// this.inputArray.push(`-${this.formulaScreenText}`);
// 		// 	console.log(this.inputArray);
// 		// }

// 		// this.outputCount = entry.toString().length();
// 		// console.log(this.outputCount);
// 		this.formulaScreenText += entry.toString();
// 		this.outputScreenText += entry.toString();
// 		this.inputCount++;
// 	}
// 	chooseOp(op) {
// 		// need if to see if last entry was op if so switch op
// 		// if (this.formulaScreenText.indexOf(op) !== -1) console.log('yes');
// 		// if (this.inputArray[this.inputCount - 1] === '+' || '-' || '*' || '/') {
// 		// 	console.log(this.inputArray);
// 		// }
// 		this.op = op;
// 		this.inputArray.push(parseFloat(this.outputScreenText));
// 		this.inputArray.push(this.op);
// 	}
// 	evaluate() {
// 		this.inputArray.push(parseFloat(this.outputScreenText));
// 		this.inputResult = this.inputArray.join('');
// 		let finalResult = Math.round(eval(this.inputResult) * 10000) / 10000;
// 		this.inputArray = [];
// 		this.inputResult = [];
// 		this.outputScreenText = finalResult;
// 	}
// 	updateDisplay() {
// 		this.formulaScreenTextElement.innerText = this.formulaScreenText;
// 		this.outputScreenTextElement.innerText = this.outputScreenText;
// 	}
// 	makeNegative(positiveVal) {
// 		return positiveVal - 2 * positiveVal;
// 	}
// }
// const formulaScreenTextElement = document.getElementById('formula-screen');
// const outputScreenTextElement = document.getElementById('output-screen');
// const numbers = document.querySelectorAll('[data-number]');
// const numsAndOps = document.querySelectorAll('[data-on-screen]');
// const op = document.querySelectorAll('[data-op]');
// const equals = document.getElementById('equals');
// const clear = document.getElementById('clear');

// const calculator = new Calculator(outputScreenTextElement, formulaScreenTextElement);

// numbers.forEach((button) => {
// 	button.addEventListener('click', () => {
// 		calculator.appendEntry(button.innerText);
// 		calculator.updateDisplay();
// 	});
// });
// op.forEach((button) => {
// 	button.addEventListener('click', () => {
// 		calculator.chooseOp(button.innerText);
// 		calculator.appendEntry(button.innerText);
// 		calculator.updateDisplay();
// 		calculator.zeroOutputScreen();
// 	});
// });
// clear.addEventListener('click', () => {
// 	calculator.zeroScreen();
// });

// equals.addEventListener('click', (button) => {
// 	calculator.evaluate();
// 	calculator.updateDisplay();
// });

// // still need to
// // changing op
// // nagative number inputs

// // set char limit error message

// // keep zero infront of decimal if op was last entry

// // template row minmax handle infitite expression

// // new calc if entries after equals

class Calculator {
	constructor(outputScreenTextElement, formulaScreenTextElement) {
		this.formulaScreenTextElement = formulaScreenTextElement;
		this.outputScreenTextElement = outputScreenTextElement;
		this.zeroScreen();
	}
	formulaScreenText = '';
	outputScreenText = '';
	outputScreenCurrent = '';
	inputCount = 0;
	inputLimit = 14;
	screenCount = 0;
	screenLimit = 100;
	screenArray = [];
	screenResult;
	evaluated = false;

	zeroScreen() {
		this.formulaScreenTextElement.innerText = '0';
		this.outputScreenTextElement.innerText = '0';
		this.op = undefined;
		this.formulaScreenText = '';
		this.outputScreenText = '';
		this.screenCount = 0;
		this.inputCount = 0;
		this.screenArray = [];
	}
	zeroOutputScreen() {
		this.outputScreenTextElement.innerText = '0';
		this.outputScreenText = '';
	}
	appendEntry(entry) {
		// need to refactor but it works for now
		if (this.inputCount === this.inputLimit) {
			if (this.outputScreenCurrent === this.outputScreenTextElement.innerText) {
				console.log('other if');
				this.outputScreenText = 'Char limit';
				for (let btn of allButtons) {
					btn.disabled = true;
					setTimeout(() => {
						this.outputScreenTextElement.innerText = this.outputScreenCurrent;
					}, 1499);
					setTimeout(() => {
						for (let btn of allButtons) {
							btn.disabled = false;
						}
					}, 2000);
					return;
				}
			}
			this.outputScreenCurrent = this.outputScreenText;
			this.screenArray.push(parseFloat(this.outputScreenCurrent));
			this.outputScreenText = 'Char limit';
			for (let btn of allButtons) {
				btn.disabled = true;
			}
			setTimeout(() => {
				this.outputScreenTextElement.innerText = this.outputScreenCurrent;
			}, 1499);
			setTimeout(() => {
				for (let btn of allButtons) {
					btn.disabled = false;
				}
			}, 2000);

			return;
		}
		if (this.screenCount === this.screenLimit) return;
		if (this.evaluated) {
			this.zeroScreen();
			this.evaluated = false;
		}
		if (entry === '.' && this.outputScreen.includes('.')) return;
		this.formulaScreenText += entry.toString();
		this.outputScreenText += entry.toString();
		this.screenCount++;
		this.inputCount++;
	}
	chooseOp(op) {
		// need if to see if last entry was op if so switch op
		// if (this.formulaScreenText.indexOf(op) !== -1) console.log('yes');

		this.op = op;
		this.screenArray.push(parseFloat(this.outputScreenText));
		this.screenArray.push(this.op);
		this.inputCount = 0;
	}
	evaluate() {
		this.screenArray.push(parseFloat(this.outputScreenText));
		this.screenResult = this.screenArray.join('');
		let finalResult = Math.round(eval(this.screenResult) * 10000) / 10000;
		this.screenArray = [];
		this.screenResult = [];
		this.outputScreenText = finalResult;
		this.evaluated = true;
	}
	updateDisplay() {
		this.formulaScreenTextElement.innerText = this.formulaScreenText;
		this.outputScreenTextElement.innerText = this.outputScreenText;
	}
}
const formulaScreenTextElement = document.getElementById('formula-screen');
const outputScreenTextElement = document.getElementById('output-screen');
const numbers = document.querySelectorAll('[data-number]');
const numsAndOps = [ ...document.querySelectorAll('[data-on-screen]') ];
const op = document.querySelectorAll('[data-op]');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const allButtons = [ ...document.querySelectorAll('button') ];

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

equals.addEventListener('click', () => {
	calculator.evaluate();
	calculator.updateDisplay();
});

// still need to
// show char limit error message
// >>>>>>>>>> diable buttons> remove massage after 2 seconds>all functionality
// handle output when char limit reach (#e^n notation)
// changing op
// nagative number screens
