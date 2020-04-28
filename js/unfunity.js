function updateUnfunity(time) {
  if(game.cookies.gt(1e150)) {
    game.unfunityPoints = game.unfunityPoints.add(game.cookies.log(10).div(100).pow(0.5).div(3600))
  }
}

function showunfunity() {
  setElem('unfunity', game.unfunityPoints.toFixed(2))
}