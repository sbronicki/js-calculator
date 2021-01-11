class Calculator {
	constructor(outputScreenText, formulaScreenText) {
		this.formulaScreenText = formulaScreenText;
		this.outputScreenText = outputScreenText;
		this.zeroScreen();
	}
	formulaScreen = '';
	outputScreen = '';
	zeroScreen() {
		this.formulaScreenText.innerText = '0';
		this.outputScreenText.innerText = '0';
		this.op = undefined;
	}
	appendEntry(entry) {
		if (entry === '.' && this.outputScreen.includes('.')) return;
		this.formulaScreen += entry.toString();
		this.outputScreen += entry.toString();
	}
	chooseOp(op) {}
	evaluate() {}
	updateDisplay() {
		this.formulaScreenText.innerText = this.formulaScreen;
		this.outputScreenText.innerText = this.outputScreen;
	}
}
const formulaScreenText = document.getElementById('formula-screen');
const outputScreenText = document.getElementById('output-screen');
const numbers = document.querySelectorAll('[data-number]');
const numsAndOps = document.querySelectorAll('[data-on-screen]');
const op = document.querySelectorAll('[data-op]');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

const calculator = new Calculator(outputScreenText, formulaScreenText);

numsAndOps.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.appendEntry(button.innerText);
		calculator.updateDisplay();
	});
});
