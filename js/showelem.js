function showElems() {
	for (let i = 0; i < 3; i++) {
		hide(`tab${i}`);
	}
	
	for (let i = 0; i < 8; i++) {
		hide(`subtab${i}`);
	}
	
	for (let i = 0; i < 16; i++) {
		hide(`${game.generators[i][0].type.replace(' ', '')}Shop`);
	}
	
	for (let i = 0; i < game.upgrades.length; i++) {
		if (game.upgrades[i].isVisible()) {
			show(`upg${i}`);
		} else {
			hide(`upg${i}`);
		}
		if (game.upgrades[i].bought) {
			show(`bupg${i}`);
		} else {
			hide(`bupg${i}`);
		}
	}
	
	for (let i = 0; i < game.achievements.length; i++) {
		if (game.achievements[i].unlocked) {
			show(`ach${i}`);
		} else {
			hide(`ach${i}`);
		}
	}
	
	show(`tab${game.tab}`);
	show(`subtab${game.subtab}`);
	show(`${game.generators[game.shoptab][0].type.replace(' ', '')}Shop`);
	if (game.autosave) {
		setdisp('autosavetime', 'inline');
	} else {
		setdisp('autosavetime', 'none');
	}
	
	for (let i = 0; i < 16; i++) {
		if (game.unlockedGens[i]) {
			show(`shopbutt${i}`);
		} else {
			hide(`shopbutt${i}`);
		}
	}
	
	if (game.cookies.gte(0)) {
		game.unlockedGens[0] = true;
	}
	if (game.cookies.gte(40)) {
		game.unlockedGens[1] = true;
	} 
	if (game.cookies.gte(500)) {
		game.unlockedGens[2] = true;
	}
	if (game.cookies.gte(4000)) {
		game.unlockedGens[3] = true;
	}
	if (game.cookies.gte(45000)) {
		game.unlockedGens[4] = true;
	}
	if (game.cookies.gte(500000)) {
		game.unlockedGens[5] = true;
	}
	if (game.cookies.gte(6e6)) {
		game.unlockedGens[6] = true;
	}
	if (game.cookies.gte(1.1e8)) {
		game.unlockedGens[7] = true;
	}
	if (game.cookies.gte(1.7e9)) {
		game.unlockedGens[8] = true;
	}
	if (game.cookies.gte(2.5e10)) {
		game.unlockedGens[9] = true;
	}
	if (game.cookies.gte(3.3e11)) {
		game.unlockedGens[10] = true;
	}
	if (game.cookies.gte(5e12)) {
		game.unlockedGens[11] = true;
	}
	if (game.cookies.gte(6e13)) {
		game.unlockedGens[12] = true;
	}
	if (game.cookies.gte(7e14)) {
		game.unlockedGens[13] = true;
	}
	if (game.cookies.gte(5e15)) {
		game.unlockedGens[14] = true;
	}
	if (game.cookies.gte(1e17)) {
		game.unlockedGens[15] = true;
	}
}