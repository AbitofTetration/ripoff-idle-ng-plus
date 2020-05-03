let prestigeReach = Number.MAX_SAFE_INTEGER

function prestige() {
    if(game.cookies.lt(prestigeReach)) return;
    game.prestigePoints = game.prestigePoints.add(game.cookies.pow(1/308))
  
		game.cookies = new Decimal(0);
		game.cps = new Decimal(0);
		game.clickPro = new Decimal(1);
		game.tps = new Decimal(20);
		game.tpsc = new Decimal(100);
		game.tsu = new Decimal(0);
		game.tooltip = '';
		
		game.generators = [];
		game.unlockedGens = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
		
		for (let i = 0; i < 16; i++) {
			game.generators[i] = [];
			for (let j = 0; j < 8; j++) {
				game.generators[i][j] = new Generator(i, j);
			}
		}
    
    game.unfunityPoints = new Decimal(0)
    game.unfunityPointsMult = new Decimal(1)
    game.unfunityGalaxies = new Decimal(0)
  
}

function showprestige() {
  setElem('unfunity', game.unfunityPoints.toFixed(2))
  setElem('unfunityBoost', getUnfunityBoost().toFixed(2))
  setElem('unfunity/sec', updateUnfunity(1).toFixed(2))

  setElem('unfunGalaxies', game.unfunityGalaxies.toFixed(2))
  setElem('unfunGalaxyBoost', getGalaxyBoost().toFixed(2))
  setElem('unfunGalaxyThreshold', Decimal.sumGeometricSeries(new Decimal(1), new Decimal(5), new Decimal(4), game.unfunityGalaxies).floor())
  setElem('unfunityMult', getUnfunityMult().toFixed(2))
}