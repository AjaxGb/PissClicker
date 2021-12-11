const FLUID_UNITS = [
    { name: 'fluid oz', div: 1n,    max: 10n, noPlural: true },
    { name: 'gill',     div: 4n,    max: 12n },
    { name: 'cup',      div: 8n,    max: 12n },
    { name: 'pint',     div: 16n,   max: 12n },
    { name: 'quart',    div: 32n,   max: 12n },
    { name: 'gallon',   div: 128n,  max: 12n },
    { name: 'barrel',   div: 4032n, max: 12n },
    { name: 'hogshead', div: 8064n, max: 12n },
    { name: 'butt',     div: 16128n },
];

function formatAmount(amount, units=FLUID_UNITS) {
	let name, div, max, noPlural, divAmount;
	for ({ name, div, max, noPlural } of units) {
		divAmount = amount / div;
		if (divAmount < 2_000_000) {
			break;
		}
	}
	const s = (divAmount == 1 || noPlural) ? '' : 's';
	return `${divAmount.toLocaleString()} ${name}${s}`;
}

class GameStateClass_ {
	constructor() {
		this.el = {
			doDrink: document.getElementById('do-drink'),
			doPiss: document.getElementById('do-piss'),
			pissNumber: document.getElementById('piss-num'),
			maxPissNumber: document.getElementById('max-piss-num'),
			pissLevel: document.getElementById('piss-level'),
		};
		
		this._currPiss = 0n;
		this.maxPiss = 24n;
		this.currPiss = 0n;
		
		this.onClickDrink = this.onClickDrink.bind(this);
		this.onClickPiss = this.onClickPiss.bind(this);
		this.el.doDrink.addEventListener('click', this.onClickDrink);
		this.el.doPiss.addEventListener('click', this.onClickPiss);
	}
	
	set currPiss(amount) {
		this._currPiss = amount;
		this.el.pissNumber.innerText = formatAmount(amount);
		this.el.pissLevel.style.height = `${amount * 100n / this.maxPiss}%`;
	}
	
	get currPiss() {
		return this._currPiss;
	}
	
	set maxPiss(amount) {
		this._maxPiss = amount;
		this.el.maxPissNumber.innerText = formatAmount(amount);
		this.el.pissLevel.style.height = `${this.currPiss * 100n / amount}%`;
	}
	
	get maxPiss() {
		return this._maxPiss;
	}
	
	onClickDrink() {
		if (++this.currPiss > this.maxPiss) {
			alert('Your balls explode. Try again.')
			window.location = window.location;
		}
	}
	
	onClickPiss() {
		if (this.currPiss > 0n) {
			--this.currPiss;
		}
	}
}
const GameState = new GameStateClass_();
window.GameState = GameState;
