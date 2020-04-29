function getGalaxyBoost() {
  let q = game.unfunityGalaxies.add(1)
  
  q = q.max(1).pow(0.5)
  
  return q
}

function updateUnfunity(time) {
  let r = game.tps.pow(-1).pow(0.35)
  let q = game.cookies.log(10).div(25).pow(0.5).div(3600)
  if(game.cookies.gt(1e150)) {
    game.unfunityPoints = game.unfunityPoints.add(q)
  }
  game.unfunityGalaxies = Decimal.affordGeometricSeries(game.unfunityPoints, new Decimal(5), new Decimal(4), new Decimal(-1)).floor()
  return q.mul(400).mul(r)
}

function getUnfunityBoost() {
  let q = game.unfunityPoints.add(1)
  
  q = q.max(1).mul(getGalaxyBoost())
  
  return q
}

function showunfunity() {
  setElem('unfunity', game.unfunityPoints.toFixed(2))
  setElem('unfunityBoost', getUnfunityBoost().toFixed(2))
  setElem('unfunity/sec', updateUnfunity(1).toFixed(2))

  setElem('unfunGalaxies', game.unfunityGalaxies.toFixed(2))
  setElem('unfunGalaxyBoost', getGalaxyBoost().toFixed(2))
  setElem('unfunGalaxyThreshold', Decimal.sumGeometricSeries(new Decimal(1), new Decimal(5), new Decimal(4), game.unfunityGalaxies).floor())
}