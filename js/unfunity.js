function getGalaxyBoost() {
  let q = game.unfunityGalaxies.add(1)
  
  q = q.max(1).pow(3.5)
  q = q.mul(getPrestigeBoosts(5))
  
  return q
}

function updateUnfunity(time) {
  let q = game.cookies.log(10).div(15).pow(0.5).div(3600).mul(getUnfunityMult())
  if(game.cookies.gt(1e150)) {
    game.unfunityPoints = game.unfunityPoints.add(q)
  }
  game.unfunityGalaxies = Decimal.affordGeometricSeries(game.unfunityPoints, new Decimal(5), new Decimal(4), new Decimal(-1)).floor()
  if(game.cookies.gt(1e150)) return q.mul(50).pow(getPrestigePointPower())
  return 0
}

function getUnfunityBoost() {
  let q = game.unfunityPoints.add(1)
  
  q = q.max(1).mul(getGalaxyBoost())
  
  return q
}

function getUnfunityMult() {
  let q = new Decimal(1)
  
  for (let i = 0; i < 16; i++) {
    let m = game.generators[i][7].amount.div(100000).mul((i*2)+1)
    q = q.add(m)
  }
  
  q = q.mul(game.tps.log(10).div(20).add(1))
  q = q.mul(game.unfunityGalaxies.add(10).log(10).pow(0.1).max(1))
  q = q.multiply(getPrestigeBoosts(2))
  
  return q
}

function showunfunity() {
  setElem('unfunity', displayNum(game.unfunityPoints))
  setElem('unfunityBoost', displayNum(getUnfunityBoost()))
  setElem('unfunity/sec', displayNum(updateUnfunity(1)))

  setElem('unfunGalaxies', displayNum(game.unfunityGalaxies))
  setElem('unfunGalaxyBoost', displayNum(getGalaxyBoost()))
  setElem('unfunGalaxyThreshold', displayNum(Decimal.sumGeometricSeries(new Decimal(1), new Decimal(5), new Decimal(4), game.unfunityGalaxies)))
  setElem('unfunityMult', displayNum(getUnfunityMult()))
}