function switchTab(i) {
	game.tab = i;
}

function switchSubTab(i) {
	game.subtab = i;
}

function switchShopTab(i) {
	game.shoptab = i;
}

function cookieClick() {
	game.cookies = game.cookies.add(game.clickPro);
	game.cookiesFromClicks = game.cookiesFromClicks.add(game.clickPro);
	game.totalProdCookies = game.totalProdCookies.add(game.clickPro);
	game.cookieClicks++;
}

function toggleas() {
	game.autosave = !game.autosave;
	save();
}

function togglebm() {
	game.buymax = !game.buymax;
}

function buyGen(typeId, dim) {
	if (game.buymax) {
		game.generators[typeId][dim].buy(maxOf(typeId, dim));
	} else {
		game.generators[typeId][dim].buy(game.buyAmount);
	}
}

function buyUpg(id) {
	game.upgrades[id].buy();
}

function setElem(id, content) {
	if (document.getElementById(id).innerHTML != content){
		document.getElementById(id).innerHTML = content;
	}
}

function displayNum(decimal, floor) {
	if (decimal instanceof Decimal){
		if (floor) {
			if (decimal.lt(1)) {
				return decimal.floor().toPrecision(1);
			} else if (decimal.lt(10)) {
				return decimal.floor().toPrecision(1).toString().replace('+', '');
			} else if (decimal.lt(100)) {
				return decimal.floor().toPrecision(2).toString().replace('+', '');
			} else {
				return decimal.floor().toPrecision(3).toString().replace('+', '');
			}

		} else {
			if (decimal.lt(1)) {
				return decimal.toPrecision(1);
			} else if (decimal.lt(10)) {
				return decimal.toPrecision(2).toString().replace('+', '');
			} else if (decimal.lt(100)) {
				return decimal.toPrecision(3).toString().replace('+', '');
			} else {
				return decimal.toPrecision(3).toString().replace('+', '');
			}
		}
	}
}

function setdisp(id, val) {
	document.getElementById(id).style.display = val;
}

function show(id) {
	setdisp(id, '');
}

function hide(id) {
	setdisp(id, 'none');
}

function maxOf(typeId, dim) {
	return Decimal.affordGeometricSeries(game.cookies, game.generators[typeId][dim].dimBasePrice, new Decimal(1.15), game.generators[typeId][dim].bought);
}

function maxTick() {
	return Decimal.affordGeometricSeries(game.cookies, new Decimal(100), new Decimal(10), game.tsu);
}

function costMaxTick() {
	return Decimal.sumGeometricSeries(new Decimal(maxTick()), new Decimal(100), new Decimal(10), game.tsu).floor();
}

function multGen(typeId, dim, m) {
	game.generators[typeId][dim].multMult(m);
}

function createTooltipUpg(id) {
	return `${game.upgradeData[id].name}&nbsp&nbsp&nbsp&nbsp<br><p class='cost'>${displayNum(game.upgradeData[id].cost)}</p><br>
	<i><small>${game.upgradeData[id].purpose}</small></i>`;
}


function createTooltipAch(id) {
	return `${game.achievementData[id].name}<br>
	<i><small>${game.achievementData[id].unlockTxt}</small></i>`;
}

function createTooltipGen(typeId, dim) {
	return `${game.generators[typeId][dim].name}&nbsp&nbsp&nbsp&nbsp<br><p class='cost'>${displayNum(game.generators[typeId][dim].price, true)}</p><br>
	<small><i>each ${game.generators[typeId][dim].name} produces ${displayNum(game.generators[typeId][dim].eachCps.div(new Decimal(20).divide(game.tps)))} ${game.generators[typeId][dim].creates}s per second,<br>
	${displayNum(game.generators[typeId][dim].amount, true)} ${game.generators[typeId][dim].name}s are producing ${displayNum(game.generators[typeId][dim].totalCps.div(new Decimal(20).divide(game.tps)))} ${game.generators[typeId][dim].creates}s per second.</i></small>`;
}

function setTooltipTo(n) {
	game.tooltip = n;
}

function isOverflown(e) {
	el = document.getElementById(e);
    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}

function mg(typeId, dim, c) {
	if (game != undefined) {
		game.generators[typeId][dim].multMult(c);
	}
}

function mag(typeId, c) {
	for (let i = 0; i < 8; i++) {
		if (game != undefined) {
			game.generators[typeId][i].multMult(c);
		}
	}
}

function cgte(c) {
	if (game != undefined) {
		return game.cookies.gte(c);
	}
}

function tcgte(c) {
	if (game != undefined) {
		return game.totalProdCookies.gte(c);
	}
}

function ggte(typeId, dim, c) {
	if (game != undefined) {
		return game.generators[typeId][dim].amount.gte(c);
	}
}

function aggte(typeId, c) {
	if (game != undefined) {
		let amounts = game.generators[typeId].map(x => x.amount.floor());
		let total = new Decimal(0);
		amounts.forEach(function(x) {
			total = total.add(x);
		})
		return total.gte(c);
	}
}

function sortUpgrades() {
	var div = document.querySelector('#upgradescontainer');
	var upg = document.querySelectorAll('#upgradescontainer .upgrade');
    var upgArr = [].slice.call(upg).sort(function (a, b) {
        return game.upgrades[parseInt(a.id.replace('upg', ''))].cost.gt(game.upgrades[parseInt(b.id.replace('upg', ''))].cost) ? 1 : -1;
    });
    upgArr.forEach(function (p) {
        div.appendChild(p);
    });
}

function infCookies() {
	if (confirm('Do you want 1e1000 cookies?')) {
		game.cookies = new Decimal('1e1000');
		window.open('html/cheater.html');
	}
}

function buyTick() {
	if (cgte(game.tpsc)) {
		game.cookies = game.cookies.subtract(game.tpsc);
		game.tpsc = game.tpsc.multiply(10);
		game.tps = game.tps.divide(0.89);
		game.tsu = game.tsu.add(1);
	}
}

function bmt() {
	let c = costMaxTick();
	let m = maxTick();
	game.cookies = game.cookies.subtract(c);
	game.tpsc = game.tpsc.multiply(new Decimal(10).pow(m));
	game.tps = game.tps.divide(new Decimal(0.89).pow(m));
	game.tsu = game.tsu.add(m);
}
