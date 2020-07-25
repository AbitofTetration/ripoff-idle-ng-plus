class Debugger {
	constructor() {
	}

	log(input) {
		console.log(input);
	}

	tab(input) {
		console.table(input);
	}

	x10cookies() {
		game.cookies = game.cookies.multiply(10);
	}
}

let d = new Debugger();