class AchievementPopup {
	constructor(id) {
		this.iconSrc = game.achievements[id].iconSrc;
		this.name = game.achievements[id].name;
	}
	
	popup() {
		let exists = true;
		let d = document.createElement('div');
		d.className = 'popup';
		
		let img = document.createElement('img');
		img.src = this.iconSrc;
		img.width = '46';
		img.height = '46';
		img.style.float = 'left';
		img.style.marginRight = '5px';
		
		let txt = document.createElement('p');
		txt.innerHTML = this.name;
		txt.style.marginLeft = '5px';
		txt.style.fontSize = '15px';
		
		d.appendChild(img);
		d.appendChild(txt);
		d.addEventListener('click', function() {
			exists = false;
			document.getElementById('popups').removeChild(d);
			delete this;
		});
		document.getElementById('popups').appendChild(d);
		
		setTimeout(function() {
			if (exists) {
				exists = false;
				document.getElementById('popups').removeChild(d);
				delete this;
			}
		}, 5000);
	}
}