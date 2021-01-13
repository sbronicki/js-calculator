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
	constructor(inputScreenTextElement, formulaScreenTextElement) {
		this.formulaScreenTextElement = formulaScreenTextElement;
		this.inputScreenTextElement = inputScreenTextElement;
		this.zeroScreen();
	}
	formulaScreenText = '';
	inputScreenText = '';
	inputScreenCurrent = '';
	// will be lower when char limit error is handled properly (not required)
	inputCount = 0;
	inputLimit = 500;
	screenCount = 0;
	screenLimit = 500;
	opRan = false;
	///////////////////////////////////////////////////////////////////////////
	screenArray = [];
	entryArray = [];
	screenResult;
	evaluated = false;
	finalResult;
	opVal;

	zeroScreen() {
		this.formulaScreenTextElement.innerText = '0';
		this.inputScreenTextElement.innerText = '0';
		this.op = undefined;
		this.formulaScreenText = '';
		this.inputScreenText = '';
		this.screenCount = 0;
		this.inputCount = 0;
		this.screenArray = [];
		this.finalResult = undefined;
	}
	zeroInputScreen() {
		this.inputScreenTextElement.innerText = '0';
		this.inputScreenText = '';
	}
	appendEntry(entry) {
		// char limit error handling
		// if (this.inputCount === this.inputLimit) {
		// 	this.inputScreenCurrent = this.inputScreenText;
		// 	this.screenArray.push(parseFloat(this.inputScreenCurrent));
		// 	this.inputScreenText = 'Char limit';
		// 	for (let btn of allButtons) {
		// 		btn.disabled = true;
		// 	}
		// 	setTimeout(() => {
		// 		this.inputCount = 0;
		// 		this.inputScreenTextElement.innerText = '0';
		// 	}, 1499);
		// 	setTimeout(() => {
		// 		for (let btn of allButtons) {
		// 			btn.disabled = false;
		// 		}
		// 	}, 1500);
		// 	return;
		// }
		// if (this.screenCount === this.screenLimit) return;

		// u.s. - #14: runnin da op after eval begins new calc with previous eval result
		if (this.finalResult && this.opRan === true) {
			console.log(this.finalResult);
			this.formulaScreenText = `${this.finalResult}${this.opVal}`;
			this.evaluated = false;
			this.finalResult = undefined;
			return;
		}

		// u.s. - #10: cant start w/ multilple zeros
		// console.log(entry);
		// this.entryArray.push(entry);
		// if (this.entryArray[0] === '0' && this.entryArray[1] === '0') return;

		if (this.evaluated) {
			this.zeroScreen();
			this.evaluated = false;
		}
		if (entry === '.' && this.inputScreenText.includes('.')) return;

		this.formulaScreenText += entry.toString();
		this.inputScreenText += entry.toString();
		this.screenCount++;
		this.inputCount++;
	}
	chooseOp(op) {
		// u.s. - #13: 2 or more op input consecutively op run should be last entered (excluding the negative (-) sign)
		// if (this.formulaScreenText.indexOf(op) !== -1) console.log('yes');

		// char limit error handling
		// this.opRan = true;
		// if (
		// 	parseFloat(this.inputScreenText) === false ||
		// 	parseFloat(this.inputScreenText) !== parseFloat(this.inputScreenText)
		// ) {
		// 	this.inputCount = 0;
		// 	return;
		// }
		this.opRan = true;
		this.op = op;
		this.screenArray.push(parseFloat(this.inputScreenText));
		this.screenArray.push(this.op);
		this.inputCount = 0;
		this.opVal = op;
	}
	evaluate() {
		this.screenArray.push(parseFloat(this.inputScreenText));
		this.screenResult = this.screenArray.join('');
		this.finalResult = Math.round(eval(this.screenResult) * 10000) / 10000;
		this.screenArray = [];
		this.screenResult = [];
		this.inputScreenText = this.finalResult;
		this.evaluated = true;
		this.opRan = false;
	}
	updateDisplay() {
		this.formulaScreenTextElement.innerText = this.formulaScreenText;
		this.inputScreenTextElement.innerText = this.inputScreenText;
	}
}
const formulaScreenTextElement = document.getElementById('formula-screen');
const inputScreenTextElement = document.getElementById('output-screen');
const numbers = document.querySelectorAll('[data-number]');
// const numsAndOps = [ ...document.querySelectorAll('[data-on-screen]') ];
const op = document.querySelectorAll('[data-op]');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

const calculator = new Calculator(inputScreenTextElement, formulaScreenTextElement);

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
		calculator.zeroInputScreen();
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
// u.s. - #10: cant start w/ multilple zeros
// u.s. - #13: 2 or more op input consecutively op run should be last entered (excluding the negative (-) sign)
// u.s. - #14: runnin da op after eval begins new calc with previous eval result

// not necessary: if '.' = first entry, put a zero in front of it
// not necessary: imput limit of 14, show error message -> zero input & be able to continue calc
