class Achievement {
	constructor(id, name, icon, unlockReq, unlocked) {
		this.id = id;
		this.name = name;
		this.iconSrc = icon;
		this.unlockReq = unlockReq;
		this.unlocked = unlocked;
	}
	
	updUnlock() {
		if (this.unlockReq() && !this.unlocked) {
			new AchievementPopup(this.id).popup();
			game.unlockedAchievements++;
		}
		this.unlocked = this.unlockReq();
		return this.unlockReq();
	}
}

let Achievements = [
	// row 1, early game
	["The beginning", "Earn 1 cookie."],
	["Click click", "Get 1 1d cursor."],
	["Rolling pins", "Get 1 1d grandma."],
	["Cookie wheat", "Get 1 1d farm."],
	["The real grind", "Earn 1e20 cookies. Reward: +1% cookie gain."],
	["Click click click", "Click 500 times. Reward: You gain +1% of CpS per click."],
	["That was unfun", "Unlock unfunity."],
	// row 2, near prestige
	["The realer grind", "Earn 1e250 cookies. Reward: +1% cookie gain."],
