class Generator {
	constructor(typeid, dim, amount, bought, mult) {
		if (amount) {
			this.amount = new Decimal(amount);
		} else {
			this.amount = new Decimal(0);
		}
		if (bought) {
			this.bought = new Decimal(bought);
		} else {
			this.bought = new Decimal(0);
		}
		if (mult) {
			this.mult = new Decimal(mult);
		} else {
			this.mult = new Decimal(1);
		}
		
		
		switch(typeid) {
			case 0:
				this.type = 'Cursor';
				this.basePrice = new Decimal(15);
				this.multPerDim = new Decimal(50);
				this.baseCps = new Decimal(0.1);
				break;
			case 1:
				this.type = 'Grandma';
				this.basePrice = new Decimal(100);
				this.multPerDim = new Decimal(250);
				this.baseCps = new Decimal(1);
				break;
			case 2:
				this.type = 'Farm';
				this.basePrice = new Decimal(1100);
				this.multPerDim = new Decimal(1e3);
				this.baseCps = new Decimal(8);
				break;
			case 3:
				this.type = 'Mine';
				this.basePrice = new Decimal(12000);
				this.multPerDim = new Decimal(1e5);
				this.baseCps = new Decimal(47);
				break;
			case 4:
				this.type = 'Factory';
				this.basePrice = new Decimal(130000);
				this.multPerDim = new Decimal(1e8);
				this.baseCps = new Decimal(260);
				break;
			case 5:
				this.type = 'Bank';
				this.basePrice = new Decimal(1.4e6);
				this.multPerDim = new Decimal(1e12);
				this.baseCps = new Decimal(1400);
				break;
			case 6:
				this.type = 'Temple';
				this.basePrice = new Decimal(2e7);
				this.multPerDim = new Decimal(1e15);
				this.baseCps = new Decimal(7800);
				break;
			case 7:
				this.type = 'Wizard Tower';
				this.basePrice = new Decimal(3.3e8);
				this.multPerDim = new Decimal(1e18);
				this.baseCps = new Decimal(44000);
				break;
			case 8:
				this.type = 'Shipment';
				this.basePrice = new Decimal(5.1e9);
				this.multPerDim = new Decimal(1e21);
				this.baseCps = new Decimal(260000);
				break;
			case 9:
				this.type = 'Alchemy Lab';
				this.basePrice = new Decimal(7.5e10);
				this.multPerDim = new Decimal(1e24);
				this.baseCps = new Decimal(1.6e6);
				break;
			case 10:
				this.type = 'Portal';
				this.basePrice = new Decimal(1e12);
				this.multPerDim = new Decimal(1e27);
				this.baseCps = new Decimal(1e7);
				break;
			case 11:
				this.type = 'Time Machine';
				this.basePrice = new Decimal(1.4e13);
				this.multPerDim = new Decimal(1e30);
				this.baseCps = new Decimal(6.5e7);
				break;
			case 12:
				this.type = 'Antimatter Condenser';
				this.basePrice = new Decimal(1.7e14);
				this.multPerDim = new Decimal(1e33);
				this.baseCps = new Decimal(4.3e8);
				break;
			case 13:
				this.type = 'Prism';
				this.basePrice = new Decimal(2.1e15);
				this.multPerDim = new Decimal(1e39);
				this.baseCps = new Decimal(2.9e9);
				break;
			case 14:
				this.type = 'Chancemaker';
				this.basePrice = new Decimal(1.6e16);
				this.multPerDim = new Decimal(1e45);
				this.baseCps = new Decimal(2.1e10);
				break;
			case 15:
				this.type = 'Fractal Engine';
				this.basePrice = new Decimal(3.1e17);
				this.multPerDim = new Decimal(1e50);
				this.baseCps = new Decimal(1.5e11);
		}
		this.dim = dim;
		if (this.dim == 0) {
			this.creates = 'cookie';
		} else {
			this.creates = `${this.dim}D ${this.type}`;
		}
		this.name = `${this.dim + 1}D ${this.type}`;
		this.dimBasePrice = this.basePrice.multiply(this.multPerDim.pow(this.dim));
		this.price = this.basePrice.multiply(this.multPerDim.pow(this.dim)).multiply(new Decimal(1.15).pow(this.bought));
		this.totalCps = this.baseCps.multiply(this.amount).multiply(this.mult);
		this.eachCps = this.baseCps.multiply(this.mult);
	}
	
	update() {
		this.price = this.basePrice.multiply(this.multPerDim.pow(this.dim)).multiply(new Decimal(1.15).pow(this.bought));
		this.totalCps = this.baseCps.multiply(this.amount).multiply(this.mult);
		this.eachCps = this.baseCps.multiply(this.mult);
	}
	
	incAmount(q) {
		this.amount = this.amount.add(q);
	}
	
	incBought(q) {
		this.bought = this.bought.add(q);
	}
	
	setMult(v) {
		this.mult = new Decimal(v);
	}
	
	multMult(v) {
		this.mult = this.mult.multiply(new Decimal(v));
	}
	
	canBuy(n) {
		if (new Decimal(n).gt(new Decimal(1e10))) {
			return false;
		} else {
			return game.cookies.gte(Decimal.sumGeometricSeries(new Decimal(n), this.dimBasePrice, new Decimal(1.15), this.bought).floor());
		}
	}
	
	costForN(n) {
		return Decimal.sumGeometricSeries(new Decimal(n), this.dimBasePrice, new Decimal(1.15), this.bought).floor();
	}
	
	buy(n) {
		if (this.canBuy(n)) {
			game.cookies = game.cookies.subtract(this.costForN(n));
			this.incAmount(n);
			this.incBought(n);
			return true;
		}
		return false;
	}
}