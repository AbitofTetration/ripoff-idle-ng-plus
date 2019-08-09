/*
	Welcome to the main JS file!

	Regardless of if your here to
	find out how to cheat or something,
	I'm going to (hopefully) comment
	you through everything.

	If I forgot to, good luck reading
	my spaghetti code ;)

	  _____    _                    __    __     _____       _   _
	 |  __ \  (_)                  / _|  / _|   |_   _|     | | | |
	 | |__) |  _   _ __     ___   | |_  | |_      | |     __| | | |   ___
	 |  _  /  | | |  _ \   / _ \  |  _| |  _|     | |    / _  | | |  / _ \
	 | | \ \  | | | |_) | | (_) | | |   | |      _| |_  | (_| | | | |  __/
	 |_|  \_\ |_| |  __/   \___/  |_|   |_|     |_____|  \__ _| |_|  \___|
				  | |
				  |_|
	thanks to https://www.messletters.com/en/big-text/ for the ASCII letters
*/

// Chuck your data into the depths of the localStorage variable...
function save() {
	localStorage.setItem('save', JSON.stringify(game));
	var x = document.getElementById("autosave");
	x.className = "show";
	setTimeout(function () {
		x.className = x.className.replace("show", "");
	}, 1000);
	setTimeout(save, game.autosaveintv * 1000);
}

// Clear the save file
function wipe() {
	delete localStorage['save'];
	setup();
	save();
}

// Retrieve your data from the depths of the localStorage variable...
function load() {
	if (localStorage.getItem('save') != undefined && localStorage.getItem('save') != 'undefined' && localStorage.getItem('save') != null) {
		game = new Game(JSON.parse(localStorage.getItem('save')));
		return true;
	} else {
		return false;
	}
}

function init() {
	if (!load()) {
		setup();
	}
	save();
	createButtons();
	let loop = setInterval(gameLoop, 50);
}

function gameLoop() {
	setElems();
	showElems();
	updGens();
	doCps();
	for (let i of game.achievements) {
		i.updUnlock();
	}
	game.autosaveintv = new Decimal(document.getElementById('asintv').value);
	game.buyAmount = new Decimal(document.getElementById('bulk').value);
	hide('loading');
}
