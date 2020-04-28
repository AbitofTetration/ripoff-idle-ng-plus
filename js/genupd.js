function updGens() {
	for (let i = 0; i < 16; i++) {
		for (let j = 0; j < 8; j++) {
			game.generators[i][j].update();
			if (game.buymax) {
				if (game.generators[i][j].canBuy(1)) {
					document.getElementById(`g${i}${j}Button`).style.opacity = 1;
				} else {
					document.getElementById(`g${i}${j}Button`).style.opacity = 0.3;
				}
			} else {
				if (game.generators[i][j].canBuy(game.buyAmount)) {
					document.getElementById(`g${i}${j}Button`).style.opacity = 1;
				} else {
					document.getElementById(`g${i}${j}Button`).style.opacity = 0.3;
				}
			}
		}
	}
	
	for (let i = 0; i < game.upgrades.length; i++) {
		if (game.upgrades[i].canBuy()) {
			document.getElementById(`upg${i}`).style.opacity = 1;
		} else {
			document.getElementById(`upg${i}`).style.opacity = 0.3;
		}
	}
}