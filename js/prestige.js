let prestigeReach = Number.MAX_VALUE

function getPrestigePointGain() {
  let q = new Decimal(1)
  
  
  
  
  
  let m = game.cookies.pow(1/308).mul(q)
  
  return q
}

function prestige() {
    if(game.cookies.lt(prestigeReach)) return;
    switchTab(0)
    switchSubTab(0)
    game.prestigePoints = game.prestigePoints.add(getPrestigePointGain())
  
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

function getPrestigePointPower() {
  let q = new Decimal(1)
  
  q = q.add(game.prestigePoints.pow(getPrestigeBoosts(3)).add(1).pow(0.1).div(100)).minus(0.01).max(1)
  
  return q;
}

function getPrestigeCost(number) {
  let q = new Decimal([1,3,5,10,25][number-1]).mul(Decimal.pow([5,5,5,10,25][number-1], game.prestigeUpgrades[number-1]))
  
  return q
}

function buyPrestigeUpgrade(number) {
  if(game.prestigePoints.lt(getPrestigeCost(number))) return;
  game.prestigePoints = game.prestigePoints.sub(getPrestigeCost(number))
  game.prestigeUpgrades[number] = game.prestigeUpgrades[number].add(1)
}

function getPrestigeBoosts(number) {
  switch(number) {
    case 1:
      return Decimal.pow(25, game.prestigeUpgrades[0])
      break;
    case 2:
      return Decimal.pow(1.5, game.prestigeUpgrades[1])
      break;
    case 3:
      return Decimal.pow(1.05, game.prestigeUpgrades[2])
      break;
  }
}

function showprestige() {
  setElem('prestigePointGain', getPrestigePointGain().toFixed(2))
  setElem('prestigeGain', game.prestigePoints.toFixed(2))
  setElem('prestigeboost', getPrestigePointPower().toFixed(8))
  
  if(game.prestigePoints.gt(0) || game.cookies.gt(prestigeReach)) {
    show('prestige')
  } else {
    hide('prestige')
  }

  if(game.cookies.gt(prestigeReach)) {
    show('prestigeButton')
  } else {
    hide('prestigeButton')
  }

  setElem('prestigeUpgrade1Boost', getPrestigeBoosts(1).toFixed(2))
  setElem('prestigeUpgrade1Cost', getPrestigeCost(1).toFixed(2))

  setElem('prestigeUpgrade2Boost', getPrestigeBoosts(2).toFixed(2))
  setElem('prestigeUpgrade2Cost', getPrestigeCost(2).toFixed(2))

  setElem('prestigeUpgrade3Boost', getPrestigeBoosts(3).toFixed(2))
  setElem('prestigeUpgrade3Cost', getPrestigeCost(3).toFixed(2))
}