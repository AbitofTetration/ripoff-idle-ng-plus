function createButtons() {
	for (let i = 0; i < 16; i++) {
		for (let j = 0; j < 8; j++) {
			let butt = document.createElement('button');
			
			let para1 = document.createElement('p');
			para1.innerHTML = `${game.generators[i][j].name}`;
			para1.className = 'para1';
			para1.id = `gb${i}${j}1`;
			
			let para2 = document.createElement('p');
			para2.innerHTML = `${displayNum(game.generators[i][j].amount, true)}`;
			para2.className = 'para2';
			para2.id = `gb${i}${j}2`;
			
			let para3 = document.createElement('p');
			if (!game.buyAmount.gt(1e10)) {
				para3.innerHTML = `${displayNum(game.generators[i][j].costForN(game.buyAmount), true)}`;
			} else if (game.buyAmount.gt(1e10)) {
				game.buyAmount = new Decimal(1e10);
				document.getElementById('bulk').value = game.buyAmount.toString();
			} else {
				game.buyAmount = new Decimal(0);
			}
			para3.className = 'para3 cost';
			para3.id = `gb${i}${j}3`;
			
			butt.id = `g${i}${j}Button`;
			butt.className = 'genbutton';
			butt.setAttribute('onclick', `buyGen(${i}, ${j})`);
			butt.setAttribute('onmouseover',`setTooltipTo(createTooltipGen(${i}, ${j}))`);
			butt.setAttribute('onmouseout', 'setTooltipTo("")');
			
			butt.appendChild(para1);
			butt.appendChild(para2);
			butt.appendChild(para3);
			
			document.getElementById(`${game.generators[i][j].type.replace(' ', '')}Shop`).appendChild(butt);
		}
	}
	
	for (let i = 0; i < game.upgrades.length; i++) {
		let d = document.createElement('div');
		d.className = 'upgrade';
		d.id = `upg${i}`;
		d.setAttribute('onmousedown', `buyUpg(${i})`);
		d.setAttribute('onmouseover',`setTooltipTo(createTooltipUpg(${i}))`);
		d.setAttribute('onmouseout', 'setTooltipTo("")');
		
		let img = document.createElement('img');
		img.src = game.upgrades[i].iconSrc;
		img.width = '45';
		img.height = '45';
		
		d.appendChild(img);
		
		document.getElementById('upgradescontainer').appendChild(d);
		
		d = document.createElement('div');
		d.className = 'upgrade';
		d.id = `bupg${i}`;
		d.setAttribute('onmouseover',`setTooltipTo(createTooltipUpg(${i}))`);
		d.setAttribute('onmouseout', 'setTooltipTo("")');
		
		img = document.createElement('img');
		img.src = game.upgrades[i].iconSrc;
		img.width = '45';
		img.height = '45';
		
		d.appendChild(img);
		
		document.getElementById('bu').appendChild(d);
		sortUpgrades();
	}
	
	for (let i = 0; i < game.achievements.length; i++) {
		let d = document.createElement('div');
		d.className = 'ach';
		d.id = `ach${i}`;
		d.setAttribute('onmouseover',`setTooltipTo(createTooltipAch(${i}))`);
		d.setAttribute('onmouseout', 'setTooltipTo("")');
		
		let img = document.createElement('img');
		img.src = game.achievements[i].iconSrc;
		img.width = '45';
		img.height = '45';
		
		d.appendChild(img);
		document.getElementById('ua').appendChild(d);
	}
}