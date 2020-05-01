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