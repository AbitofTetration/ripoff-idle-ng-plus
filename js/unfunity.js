function getAscensionPower() {
	let q = game.ascensions.div(20);
	q = q.mul(getPrestigeBoosts(5));
  
	return q;
}

function getGalaxyBoost() {
	let q = game.unfunityGalaxies.add(1);
  
	q = q.pow(Decimal.add(getAscensionPower(),1));
	q = q.pow(0.35).max(1);
  
	return q;
}

function updateUnfunity(time) {
	let q = game.cookies.log(10).div(5400).pow(0.5).mul(getUnfunityMult());
	if(game.cookies.gt(1e150)) {
		game.unfunityPoints = game.unfunityPoints.add(q);
	}
	game.unfunityGalaxies = Decimal.affordGeometricSeries(game.unfunityPoints, new Decimal(10), new Decimal(8), new Decimal(0)).floor();
	if(game.cookies.gt(1e150)) return q.mul(20).pow(getPrestigePointPower());
	return 0;
}

function getUnfunityBoost() {
	let q = game.unfunityPoints.add(1);
  
	q = q.max(1).pow(getGalaxyBoost());
	if (q.gte(1e10)) {
	q = q.pow(4).log(1.5).mul(game.unfunityPoints.log(2)).pow(5).max(1e10)
	}
  
	return q;
}

function getUnfunityMult() {
	let q = new Decimal(1);
  
	for (let i = 0; i < 16; i++) {
		let m = game.generators[i][7].amount.div(100000).mul((i*2)+1);
		q = q.add(m);
	}
  
	q = q.mul(game.tps.log(10).div(20).add(1));
	q = q.mul(game.unfunityGalaxies.add(10).log(10).pow(0.1).max(1));
	q = q.multiply(getPrestigeBoosts(2));
  
	return q;
}

function getAscendCost() {
	let q = game.ascensions.add(1.43);
	q = q.pow(1.2);
	if (game.ascensions.gt(5)) {
		q = q.mul(game.ascensions.sub(4).pow(1.1))
		q = q.pow(0.94)
	}
	return q;
}

function ascend() {
	if (!game.unfunityGalaxies.gte(getAscendCost())) return;
	game.ascensions = game.ascensions.add(1);
	game.unfunityPoints = new Decimal(0);
}

function showunfunity() {

	if(game.cookies.gt(1e150)) {
		show("unfun");
	} else {
		hide("unfun");
	}
	if(getUnfunityBoost().gt(1e10)) {
		show("unfunMultSoftcap");
	} else {
		hide("unfunMultSoftcap");
	}
	setElem("unfunity", displayNum(game.unfunityPoints));
	setElem("unfunityBoost", displayNum(getUnfunityBoost()));
	setElem("unfunity/sec", displayNum(updateUnfunity(33)));

	setElem("unfunGalaxies", displayNum(game.unfunityGalaxies));
	setElem("unfunGalaxyBoost", displayNum(getGalaxyBoost()));
	setElem("unfunGalaxyThreshold", displayNum(Decimal.sumGeometricSeries(new Decimal(1), new Decimal(10), new Decimal(8), game.unfunityGalaxies)));
	setElem("unfunityMult", displayNum(getUnfunityMult()));

	setElem("ascensions", displayNum(game.ascensions));
	setElem("ascensionCost", displayNum(getAscendCost()));
	setElem("ascensionBoost", displayNum(getAscensionPower().mul(100)));
}
