let prestigeReach = Number.MAX_VALUE

function getPrestigePointGain() {
  let q = new Decimal(1)
  
  
  
  
  q = q.mul(getPrestigeBoosts(4))
  q = q.mul(getPrestigeBoosts(7))
  let m = game.cookies.pow(1/308).div(10).mul(q)
  
  return m
}

function prestige() {
    if(game.cookies.lt(prestigeReach)) return;
    switchTab(0)
    switchSubTab(0)
    game.prestiges = game.prestiges.add(1)
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
	  game.upgrades.forEach((x)=>{x.bought=false})
}

function getPrestigePointPower() {
  let q = new Decimal(1)
  
  q = q.add(game.prestigePoints.pow(getPrestigeBoosts(3)).add(1).pow(0.1).div(100)).minus(0.01).max(1)
  
  return q;
}

function getPrestigeCost(number) {
  let q = new Decimal([1,3,5,1,5,10,8,10][number-1]).mul(Decimal.pow([5,5,5,10,5,Infinity,8,Infinity][number-1], game.prestigeUpgrades[number-1]))
  
  return q
}

function buyPrestigeUpgrade(number) {
  if(game.prestigePoints.lt(getPrestigeCost(number))) return;
  game.prestigePoints = game.prestigePoints.sub(getPrestigeCost(number))
  game.prestigeUpgrades[number-1] = game.prestigeUpgrades[number-1].add(1)
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
    case 4:
      return Decimal.pow(2, game.prestigeUpgrades[3])
      break;
    case 5:
      return Decimal.pow(game.prestiges.pow(0.02), game.prestigeUpgrades[4]).add(1)
      break;
    case 7:
      return Decimal.pow(game.unfunityPoints.pow(0.05), game.prestigeUpgrades[7])
      break;
  }
}

function showprestige() {
  setElem('prestigePointGain', displayNum(getPrestigePointGain()))
  setElem('prestigeGain', displayNum(game.prestigePoints))
  setElem('prestigeboost', displayNum(getPrestigePointPower(), false, 8))
  
  if(game.prestiges.gt(0) || game.cookies.gt(prestigeReach)) {
    show('prestige')
  } else {
    hide('prestige')
  }

  if(game.cookies.gt(prestigeReach)) {
    show('prestigeButton')
  } else {
    hide('prestigeButton')
  }
  
  setElem('statprest', 'Prestiges: ' + displayNum(game.prestiges))

  setElem('prestigeUpgrade1Boost', displayNum(getPrestigeBoosts(1)))
  setElem('prestigeUpgrade1Cost', displayNum(getPrestigeCost(1)))

  setElem('prestigeUpgrade2Boost', displayNum(getPrestigeBoosts(2)))
  setElem('prestigeUpgrade2Cost', displayNum(getPrestigeCost(2)))

  setElem('prestigeUpgrade3Boost', displayNum(getPrestigeBoosts(3)))
  setElem('prestigeUpgrade3Cost', displayNum(getPrestigeCost(3)))

  setElem('prestigeUpgrade4Boost', displayNum(getPrestigeBoosts(4)))
  setElem('prestigeUpgrade4Cost', displayNum(getPrestigeCost(4)))

  setElem('prestigeUpgrade5Boost', displayNum(getPrestigeBoosts(5)))
  setElem('prestigeUpgrade5Cost', displayNum(getPrestigeCost(5)))

  setElem('prestigeUpgrade7Boost', displayNum(getPrestigeBoosts(7)))
  setElem('prestigeUpgrade7Cost', displayNum(getPrestigeCost(7)))
  
  setElem('prestigeUpgrade6Cost', (game.prestigeUpgrades[5].gt(0) ? "Bought" : "Cost: " + displayNum(getPrestigeCost(6)) + " PP"))
  
  setElem('prestigeUpgrade8Cost', (game.prestigeUpgrades[7].gt(0) ? "Bought" : "Cost: " + displayNum(getPrestigeCost(8)) + " PP"))
}