function doCps() {
	let cps = new Decimal(0);
	for (let i = 0; i < 16; i++) {
		cps = cps.add(game.generators[i][0].totalCps);
	}
	game.cps = cps.divide(new Decimal(20).divide(game.tps));
	//game.cps = game.cps
	game.cookies = game.cookies.add(cps.div(new Decimal(400).divide(game.tps)));
	game.totalProdCookies = game.totalProdCookies.add(cps.div(new Decimal(400).divide(game.tps)));
	for (let i = 0; i < 16; i++) {
		for (let j = 1; j < 8; j++) {
			game.generators[i][j - 1].incAmount(game.generators[i][j].totalCps.div(new Decimal(400).divide(game.tps)));
		}
	}
	updateUnfunity(game.tps);
}