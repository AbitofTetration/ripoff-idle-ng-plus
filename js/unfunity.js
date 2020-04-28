function updateUnfunity(time) {
  if(game.cookies.gt(1e150)) {
    game.unfunityPoints = game.unfunityPoints.add(game.cookies.log(10).div(50).pow(0.5).div(3600))
  }
  return game.cookies.log(10).div(25).pow(0.5).div(3600).mul(400)
}

function getUnfunityBoost() {
  let q = game.unfunityPoints.add(1)
  
  q = q.max(1).pow(0.50)
  
  return q
}

function showunfunity() {
  setElem('unfunity', game.unfunityPoints.toFixed(2))
  setElem('unfunityBoost', getUnfunityBoost().toFixed(2))
  setElem('unfunity/sec', updateUnfunity(1).toFixed(2))
}