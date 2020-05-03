function getGalaxyBoost() {
  let q = game.unfunityGalaxies.add(1)
  
  q = q.max(1).pow(3.5)
  
  return q
}

function updateUnfunity(time) {
  let q = game.cookies.log(10).div(15).pow(0.5).div(3600).mul(getUnfunityMult())
  if(game.cookies.gt(1e150)) {
    game.unfunityPoints = game.unfunityPoints.add(q)
  }
  game.unfunityGalaxies = Decimal.affordGeometricSeries(game.unfunityPoints, new Decimal(5), new Decimal(4), new Decimal(-1)).floor()
  return q.mul(400)
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
  
  return q
}

function showunfunity() {
  setElem('unfunity', game.unfunityPoints.toFixed(2))
  setElem('unfunityBoost', getUnfunityBoost().toFixed(2))
  setElem('unfunity/sec', updateUnfunity(1).toFixed(2))

  setElem('unfunGalaxies', game.unfunityGalaxies.toFixed(2))
  setElem('unfunGalaxyBoost', getGalaxyBoost().toFixed(2))
  setElem('unfunGalaxyThreshold', Decimal.sumGeometricSeries(new Decimal(1), new Decimal(5), new Decimal(4), game.unfunityGalaxies).floor())
  setElem('unfunityMult', getUnfunityMult().toFixed(2))
}