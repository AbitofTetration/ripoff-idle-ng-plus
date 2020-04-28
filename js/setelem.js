function setElems() {
	setElem('version', `Ripoff Idle NG+ v${game.vers} by Despacit`);
	setElem('tps', `TPS: ${displayNum(game.tps)}&nbsp&nbsp`);
	setElem('tpsc', `${displayNum(game.tpsc)}`);
	setElem('cookiecount', `${displayNum(game.cookies, true)}`);
	
	if (game.subtab == 0) {
		setElem('statcookies', `Cookies: ${displayNum(game.cookies, true)}`);
		setElem('stattotalcookies', `Total Baked Cookies: ${displayNum(game.totalProdCookies, true)}`);
		setElem('statcookieclicks', `Cookie Clicks: ${game.cookieClicks}`);
		setElem('statcps', `Cookies per Second: ${displayNum(game.cps)}`);
	} else if (game.subtab == 1)  {
		setElem('up', `${game.boughtUpgrades} / ${game.upgrades.length}`);
	} else if (game.subtab == 2)  {
		setElem('ap', `${game.unlockedAchievements} / ${game.achievements.length}`);
	}
	
	setElem('tooltip', game.tooltip);
	document.getElementById('tooltip').style.fontSize = 'initial';
	let tempSize = 20;
	while (isOverflown('tooltip')) {
		tempSize--;
		document.getElementById('tooltip').style.fontSize = `${tempSize}px`;
	}
	
	if (game.autosave) {
		setElem('asstate', ' On');
	} else {
		setElem('asstate', ' Off');
	}
	if (game.buymax) {
		setElem('bmstate', ' On');
	} else {
		setElem('bmstate', ' Off');
	}
	let i = game.shoptab;
	for (let j = 0; j < 8; j++) {
		setElem(`gb${i}${j}1`, `${game.generators[i][j].name}`);
		setElem(`gb${i}${j}2`, `${displayNum(game.generators[i][j].amount, true)}`);
		if (!game.buyAmount.gt(1e10)) {
			if (game.buymax) {
				if (maxOf(i, j).toNumber() == 0) {
					setElem(`gb${i}${j}3`, `${displayNum(game.generators[i][j].costForN(1), true)}`);
				} else {
					setElem(`gb${i}${j}3`, `${displayNum(game.generators[i][j].costForN(maxOf(i, j)), true)}`);
				}
			} else {
				setElem(`gb${i}${j}3`, `${displayNum(game.generators[i][j].costForN(game.buyAmount), true)}`);
			}
		} else if (game.buyAmount.gt(1e10)) {
			game.buyAmount = new Decimal(1e10);
			document.getElementById('bulk').value = game.buyAmount.toString();
		} else {
			game.buyAmount = new Decimal(0);
		}
	}
}