let prestigeReach = Number.MAX_VALUE;

function getPrestigePointGain() {
	let q = new Decimal(1);




	q = q.mul(getPrestigeBoosts(4));
	q = q.mul(getPrestigeBoosts(7));
	let m = game.cookies.pow(1/308).div(10).mul(q);

	return m;
}

function prestige() {
	if(game.cookies.lt(prestigeReach)) return;
	switchTab(0);
	switchSubTab(0);
	game.prestiges = game.prestiges.add(1);
	game.prestigePoints = game.prestigePoints.add(getPrestigePointGain());
  
	game.cookies = new Decimal(0);
	game.cps = new Decimal(0);
	game.clickPro = new Decimal(1);
	game.tps = new Decimal(20);
	game.tpsc = new Decimal(100);
	game.tsu = new Decimal(0);
	game.tooltip = "";
		
	game.generators = [];
	game.unlockedGens = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
		
	if (game.prestigeUpgrades[9]) {
		for (let i = 0; i < 16; i++) {
			game.generators[i] = [];
			for (let j = 0; j < 8; j++) {
				game.generators[i][j] = new Generator(i, j);
			}
		}
	}
    
	if(game.prestigeUpgrades[8] < 1) game.unfunityPoints = new Decimal(0);
	if(game.prestigeUpgrades[8] < 1) game.unfunityPointsMult = new Decimal(1);
	if(game.prestigeUpgrades[8] < 1) game.unfunityGalaxies = new Decimal(0);
	game.upgrades.forEach((x)=>{x.bought=false;});
}

function getPrestigePointPower() {
	let q = new Decimal(1);
  
	q = q.add(game.prestigePoints.pow(getPrestigeBoosts(3)).add(1).pow(0.1).div(100)).minus(0.01).max(1);
  
	return q;
}

function getPrestigeCost(number) {
	let q = new Decimal([1,2,3,1,3,5,5,15,50,250,400][number-1]).mul(Decimal.pow([3,4,4,5,6,Infinity,7,Infinity,Infinity,Infinity,16][number-1], game.prestigeUpgrades[number-1]));
  
	return q;
}

function buyPrestigeUpgrade(number) {
	if(game.prestigePoints.lt(getPrestigeCost(number))) return;
	game.prestigePoints = game.prestigePoints.sub(getPrestigeCost(number));
	game.prestigeUpgrades[number-1] = game.prestigeUpgrades[number-1].add(1);
}

function getPrestigeBoosts(number) {
	// you don't need to break if you return a value in a switch case
	switch(number) {
		case 1:
			let q = Decimal.pow(25, game.prestigeUpgrades[0]);
			
			if (q > 5000) {
			    q = Decimal.pow(25, game.prestigeUpgrades[0].pow(0.95));
			}
			return q
		case 2:
			return Decimal.pow(1.5, game.prestigeUpgrades[1]);
		case 3:
			return Decimal.pow(1.05, game.prestigeUpgrades[2]);
		case 4:
			return Decimal.pow(2, game.prestigeUpgrades[3]);
		case 5:
			let m = new Decimal(1)
			m = m.add(game.prestigeUpgrades[4].div(20))
			return m;
		case 7:
			return Decimal.pow(game.unfunityPoints.pow(0.05), game.prestigeUpgrades[6]);
		case 11:
			return Decimal.pow(4, game.prestigeUpgrades[10].pow(1.2));
	}
}

function showprestige() {
	setElem("prestigePointGain", displayNum(getPrestigePointGain()));
	setElem("prestigeGain", displayNum(game.prestigePoints));
	setElem("prestigeboost", displayNum(getPrestigePointPower(), false, 8));

	if(game.prestiges.gt(0) || game.cookies.gt(prestigeReach)) {
		show("prestige");
	} else {
		hide("prestige");
	}

	if(game.cookies.gt(prestigeReach)) {
		show("prestigeButton");
	} else {
		hide("prestigeButton");
	}
  
	setElem("statprest", "Prestiges: " + displayNum(game.prestiges));

	setElem("prestigeUpgrade1Boost", displayNum(getPrestigeBoosts(1)));
	setElem("prestigeUpgrade1Cost", displayNum(getPrestigeCost(1)));
	if(getPrestigeBoosts(1).gt(5000)) {
		show("softcappedPrestUpgrade1");
	} else {
		hide("softcappedPrestUpgrade1");
	}

	setElem("prestigeUpgrade2Boost", displayNum(getPrestigeBoosts(2)));
	setElem("prestigeUpgrade2Cost", displayNum(getPrestigeCost(2)));

	setElem("prestigeUpgrade3Boost", displayNum(getPrestigeBoosts(3)));
	setElem("prestigeUpgrade3Cost", displayNum(getPrestigeCost(3)));

	setElem("prestigeUpgrade4Boost", displayNum(getPrestigeBoosts(4)));
	setElem("prestigeUpgrade4Cost", displayNum(getPrestigeCost(4)));

	setElem("prestigeUpgrade5Boost", displayNum(getPrestigeBoosts(5), true, 2));
	setElem("prestigeUpgrade5Cost", displayNum(getPrestigeCost(5)));

	setElem("prestigeUpgrade7Boost", displayNum(getPrestigeBoosts(7)));
	setElem("prestigeUpgrade7Cost", displayNum(getPrestigeCost(7)));

	setElem("prestigeUpgrade11Boost", displayNum(getPrestigeBoosts(11)));
	setElem("prestigeUpgrade11Cost", displayNum(getPrestigeCost(11)));
  
	setElem("prestigeUpgrade6Cost", (game.prestigeUpgrades[5].gt(0) ? "Bought" : "Cost: " + displayNum(getPrestigeCost(6)) + " PP"));
  
	setElem("prestigeUpgrade8Cost", (game.prestigeUpgrades[7].gt(0) ? "Bought" : "Cost: " + displayNum(getPrestigeCost(8)) + " PP"));
  
	setElem("prestigeUpgrade9Cost", (game.prestigeUpgrades[8].gt(0) ? "Bought" : "Cost: " + displayNum(getPrestigeCost(9)) + " PP"));
  
	setElem("prestigeUpgrade10Cost", (game.prestigeUpgrades[9].gt(0) ? "Bought" : "Cost: " + displayNum(getPrestigeCost(10)) + " PP"));
}
