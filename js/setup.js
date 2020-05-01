function setup() {
	game = new Game();
}

class Game {
	constructor(data) {
		this.cookies = new Decimal(0);
		this.cookieClicks = 0;
		this.cookiesFromClicks = new Decimal(0);
		this.totalProdCookies = new Decimal(0);
		this.cps = new Decimal(0);
		this.clickPro = new Decimal(1);
		this.tps = new Decimal(20);
		this.tpsc = new Decimal(100);
		this.tsu = new Decimal(0);
		this.tooltip = '';
		
		this.generators = [];
		this.unlockedGens = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
		
		for (let i = 0; i < 16; i++) {
			this.generators[i] = [];
			for (let j = 0; j < 8; j++) {
				this.generators[i][j] = new Generator(i, j);
			}
		}
    
    this.unfunityPoints = new Decimal(0)
    this.unfunityPointsMult = new Decimal(1)
    this.unfunityGalaxies = new Decimal(0)
		
		// Begin Data Objects
		this.upgradeData = [
			// 1D Cursors
			{
				name: 'Fast Fingers',
				cost: new Decimal(100),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(0, 0, 2),
				visReq: () => ggte(0, 0, 1),
				purpose: 'Multiplies 1D cursor efficiency by 2.'
			},
			{
				name: 'Quick Fingers',
				cost: new Decimal(1e3),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(0, 0, 2),
				visReq: () => ggte(0, 0, 10),
				purpose: 'Multiplies 1D cursor efficiency by 2.'
			},
			{
				name: 'Speedy Fingers',
				cost: new Decimal(1e4),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(0, 0, 2),
				visReq: () => ggte(0, 0, 25),
				purpose: 'Multiplies 1D cursor efficiency by 2.'
			},
			{
				name: 'Swift Fingers',
				cost: new Decimal(1e6),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(0, 0, 2),
				visReq: () => ggte(0, 0, 50),
				purpose: 'Multiplies 1D cursor efficiency by 2.'
			},
			{
				name: 'Brisk Fingers',
				cost: new Decimal(1e9),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(0, 0, 2),
				visReq: () => ggte(0, 0, 100),
				purpose: 'Multiplies 1D cursor efficiency by 2.'
			},
			// All Cursors
			{
				name: 'Gotta Hand it to You',
				cost: new Decimal(2e3),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(0, 2),
				visReq: () => ggte(0, 1, 1),
				purpose: 'Multiplies cursor efficiency by 2.'
			},
			{
				name: 'How Many Fingers?',
				cost: new Decimal(1e5),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(0, 3),
				visReq: () => ggte(0, 2, 1),
				purpose: 'Multiplies cursor efficiency by 3.'
			},
			{
				name: 'True Pianist',
				cost: new Decimal(5e6),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(0, 4),
				visReq: () => ggte(0, 3, 1),
				purpose: 'Multiplies cursor efficiency by 4.'
			},
			{
				name: 'Too Many Fingers',
				cost: new Decimal(3e8),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(0, 5),
				visReq: () => ggte(0, 4, 1),
				purpose: 'Multiplies cursor efficiency by 5.'
			},
			{
				name: 'All of the Fingers',
				cost: new Decimal(2e10),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(0, 6),
				visReq: () => ggte(0, 5, 1),
				purpose: 'Multiplies cursor efficiency by 6.'
			},
			{
				name: 'Tendonitis',
				cost: new Decimal(1e12),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(0, 7),
				visReq: () => ggte(0, 6, 1),
				purpose: 'Multiplies cursor efficiency by 7.'
			},
			{
				name: 'Just One More Click',
				cost: new Decimal(5e13),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(0, 8),
				visReq: () => ggte(0, 7, 1),
				purpose: 'Multiplies cursor efficiency by 8.'
			},
			// 1D Grandmas
			{
				name: 'A Grandma',
				cost: new Decimal(500),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(1, 0, 2),
				visReq: () => ggte(1, 0, 1),
				purpose: 'Multiplies 1D grandma efficiency by 2.'
			},
			{
				name: 'More Grandma',
				cost: new Decimal(1e4),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(1, 0, 2),
				visReq: () => ggte(1, 0, 10),
				purpose: 'Multiplies 1D grandma efficiency by 2.'
			},
			{
				name: 'Many Grandma',
				cost: new Decimal(5e5),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(1, 0, 2),
				visReq: () => ggte(1, 0, 25),
				purpose: 'Multiplies 1D grandma efficiency by 2.'
			},
			{
				name: 'Most Grandma',
				cost: new Decimal(1e7),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(1, 0, 2),
				visReq: () => ggte(1, 0, 50),
				purpose: 'Multiplies 1D grandma efficiency by 2.'
			},
			{
				name: 'All Grandma',
				cost: new Decimal(5e9),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(1, 0, 2),
				visReq: () => ggte(1, 0, 100),
				purpose: 'Multiplies 1D grandma efficiency by 2.'
			},
			// All Grandmas
			{
				name: 'Flat Grandmas',
				cost: new Decimal(1e5),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(1, 2),
				visReq: () => ggte(1, 1, 1),
				purpose: 'Multiplies grandma efficiency by 2.'
			},	
			{
				name: 'Fat Grandmas',
				cost: new Decimal(3e7),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(1, 3),
				visReq: () => ggte(1, 2, 1),
				purpose: 'Multiplies grandma efficiency by 3.'
			},	
			{
				name: 'Meta Grandmas',
				cost: new Decimal(8e9),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(1, 4),
				visReq: () => ggte(1, 3, 1),
				purpose: 'Multiplies grandma efficiency by 4.'
			},	
			{
				name: 'Meta Meta Grandmas',
				cost: new Decimal(2e12),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(1, 5),
				visReq: () => ggte(1, 4, 1),
				purpose: 'Multiplies grandma efficiency by 5.'
			},	
			{
				name: 'Meta Meta Meta Grandmas',
				cost: new Decimal(5e14),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(1, 6),
				visReq: () => ggte(1, 5, 1),
				purpose: 'Multiplies grandma efficiency by 6.'
			},	
			{
				name: 'Meta<sup>4</sup> Grandmas',
				cost: new Decimal(1e17),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(1, 7),
				visReq: () => ggte(1, 6, 1),
				purpose: 'Multiplies grandma efficiency by 7.'
			},
			{
				name: 'Grandmas',
				cost: new Decimal(3e19),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(1, 8),
				visReq: () => ggte(1, 7, 1),
				purpose: 'Multiplies grandma efficiency by 8.'
			},
			// 1D Farms
			{
				name: 'Cookie Seeds',
				cost: new Decimal(5e3),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(2, 0, 2),
				visReq: () => ggte(2, 0, 1),
				purpose: 'Multiplies 1D farm efficiency by 2.'
			},
			{
				name: 'Chocolate Hoes',
				cost: new Decimal(1e5),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(2, 0, 2),
				visReq: () => ggte(2, 0, 10),
				purpose: 'Multiplies 1D farm efficiency by 2.'
			},
			{
				name: 'Sugary Fertiliser',
				cost: new Decimal(1e6),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(2, 0, 2),
				visReq: () => ggte(2, 0, 25),
				purpose: 'Multiplies 1D farm efficiency by 2.'
			},
			{
				name: 'Agricultural Chocolate',
				cost: new Decimal(3e7),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(2, 0, 2),
				visReq: () => ggte(2, 0, 50),
				purpose: 'Multiplies 1D farm efficiency by 2.'
			},
			{
				name: 'Genetically Modified Chocolate',
				cost: new Decimal(5e10),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(2, 0, 2),
				visReq: () => ggte(2, 0, 100),
				purpose: 'Multiplies 1D farm efficiency by 2.'
			},
			// All Farms
			{
				name: 'Crop Fields',
				cost: new Decimal(1e7),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(2, 2),
				visReq: () => ggte(2, 1, 1),
				purpose: 'Multiplies farm efficiency by 2.'
			},
			{
				name: 'Farming Planet',
				cost: new Decimal(1e10),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(2, 3),
				visReq: () => ggte(2, 2, 1),
				purpose: 'Multiplies farm efficiency by 3.'
			},
			{
				name: 'Hyperbolic Farm',
				cost: new Decimal(1e13),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(2, 4),
				visReq: () => ggte(2, 3, 1),
				purpose: 'Multiplies farm efficiency by 4.'
			},
			{
				name: 'Elliptic Farm',
				cost: new Decimal(1e16),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(2, 5),
				visReq: () => ggte(2, 4, 1),
				purpose: 'Multiplies farm efficiency by 5.'
			},
			{
				name: 'Multidimensional Toroid Farm',
				cost: new Decimal(1e19),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(2, 6),
				visReq: () => ggte(2, 5, 1),
				purpose: 'Multiplies farm efficiency by 6.'
			},
			{
				name: 'Möbius Farm',
				cost: new Decimal(1e22),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(2, 7),
				visReq: () => ggte(2, 6, 1),
				purpose: 'Multiplies farm efficiency by 7.'
			},
			{
				name: 'Poincaré Farm',
				cost: new Decimal(1e25),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(2, 8),
				visReq: () => ggte(2, 7, 1),
				purpose: 'Multiplies farm efficiency by 8.'
			},
			// 1D Mines
			{
				name: 'Wooden Pickaxes',
				cost: new Decimal(5e4),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(3, 0, 2),
				visReq: () => ggte(3, 0, 1),
				purpose: 'Multiplies 1D mine efficiency by 2.'
			},
			{
				name: 'Stone Pickaxes',
				cost: new Decimal(1e6),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(3, 0, 2),
				visReq: () => ggte(3, 0, 10),
				purpose: 'Multiplies 1D mine efficiency by 2.'
			},
			{
				name: 'Iron Pickaxes',
				cost: new Decimal(1e7),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(3, 0, 2),
				visReq: () => ggte(3, 0, 25),
				purpose: 'Multiplies 1D mine efficiency by 2.'
			},
			{
				name: 'Diamond Pickaxes',
				cost: new Decimal(3e8),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(3, 0, 2),
				visReq: () => ggte(3, 0, 50),
				purpose: 'Multiplies 1D mine efficiency by 2.'
			},
			{
				name: 'Punching <strike>Wood</strike> Chocolate',
				cost: new Decimal(5e11),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(3, 0, 2),
				visReq: () => ggte(3, 0, 100),
				purpose: 'Multiplies 1D mine efficiency by 2.'
			},
			// All Mines
			{
				name: 'Drills',
				cost: new Decimal(5e9),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(3, 2),
				visReq: () => ggte(3, 1, 1),
				purpose: 'Multiplies mine efficiency by 2.'
			},
			{
				name: 'Dynamite',
				cost: new Decimal(5e14),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(3, 3),
				visReq: () => ggte(3, 2, 1),
				purpose: 'Multiplies mine efficiency by 3.'
			},
			{
				name: 'Large Scale Mining Operations',
				cost: new Decimal(5e19),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(3, 4),
				visReq: () => ggte(3, 3, 1),
				purpose: 'Multiplies mine efficiency by 4.'
			},
			{
				name: 'Controlled Nuclear Explosives',
				cost: new Decimal(5e24),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(3, 5),
				visReq: () => ggte(3, 4, 1),
				purpose: 'Multiplies mine efficiency by 5.'
			},
			{
				name: 'Quarries',
				cost: new Decimal(5e29),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(3, 6),
				visReq: () => ggte(3, 5, 1),
				purpose: 'Multiplies mine efficiency by 6.'
			},
			{
				name: 'Hollow Earth',
				cost: new Decimal(5e34),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(3, 7),
				visReq: () => ggte(3, 6, 1),
				purpose: 'Multiplies mine efficiency by 7.'
			},
			{
				name: 'Extrasolar Planetary Mines',
				cost: new Decimal(5e39),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(3, 8),
				visReq: () => ggte(3, 7, 1),
				purpose: 'Multiplies mine efficiency by 8'
			},
			// 1D Factories
			{
				name: 'Industrialism',
				cost: new Decimal(3e5),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(4, 0, 2),
				visReq: () => ggte(4, 0, 1),
				purpose: 'Multiplies 1D factory efficiency by 2.'
			},
			{
				name: 'Bigger Warehouses',
				cost: new Decimal(5e6),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(4, 0, 2),
				visReq: () => ggte(4, 0, 10),
				purpose: 'Multiplies 1D factory efficiency by 2.'
			},
			{
				name: 'Hyperspeed Manafacturing',
				cost: new Decimal(1e8),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(4, 0, 2),
				visReq: () => ggte(4, 0, 25),
				purpose: 'Multiplies 1D factory efficiency by 2.'
			},
			{
				name: 'Chocolate Construction Plant',
				cost: new Decimal(3e10),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(4, 0, 2),
				visReq: () => ggte(4, 0, 50),
				purpose: 'Multiplies 1D factory efficiency by 2.'
			},
			{
				name: 'Lunar Factories',
				cost: new Decimal(3e12),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(4, 0, 2),
				visReq: () => ggte(4, 0, 100),
				purpose: 'Multiplies 1D factory efficiency by 2.'
			},
			// All Factories
			{
				name: 'Layered Conveyor Belts',
				cost: new Decimal(8e13),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(4, 2),
				visReq: () => ggte(4, 1, 1),
				purpose: 'Multiplies factory efficiency by 2.'
			},
			{
				name: 'Efficient Waste Disposal',
				cost: new Decimal(1e22),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(4, 3),
				visReq: () => ggte(4, 2, 1),
				purpose: 'Multiplies factory efficiency by 3.'
			},
			{
				name: 'Dyson Sphere Powered Planetary Factories',
				cost: new Decimal(5e29),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(4, 4),
				visReq: () => ggte(4, 3, 1),
				purpose: 'Multiplies factory efficiency by 4.'
			},
			{
				name: 'Controlled Gamma Ray Burst Energy Sources',
				cost: new Decimal(5e37),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(4, 5),
				visReq: () => ggte(4, 4, 1),
				purpose: 'Multiplies factory efficiency by 5.'
			},
			{
				name: 'Pulsar Based Energy Sources',
				cost: new Decimal(6e45),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(4, 6),
				visReq: () => ggte(4, 5, 1),
				purpose: 'Multiplies factory efficiency by 6.'
			},
			{
				name: 'Magnetar Based Energy Sources',
				cost: new Decimal(7e53),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(4, 7),
				visReq: () => ggte(4, 6, 1),
				purpose: 'Multiplies factory efficiency by 7.'
			},
			{
				name: 'Black Hole Based Energy Sources',
				cost: new Decimal(8e61),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(4, 8),
				visReq: () => ggte(4, 7, 1),
				purpose: 'Multiplies factory efficiency by 8.'
			},
			// 1D Banks
			{
				name: 'Economic Cookies',
				cost: new Decimal(5e6),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(5, 0, 2),
				visReq: () => ggte(5, 0, 1),
				purpose: 'Multiplies 1D bank efficiency by 2.'
			},
			{
				name: 'Sweet Loans',
				cost: new Decimal(8e7),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(5, 0, 2),
				visReq: () => ggte(5, 0, 10),
				purpose: 'Multiplies 1D bank efficiency by 2.'
			},
			{
				name: 'Chocolate Interest',
				cost: new Decimal(1e9),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(5, 0, 2),
				visReq: () => ggte(5, 0, 25),
				purpose: 'Multiplies 1D bank efficiency by 2.'
			},
			{
				name: 'Sugary Profit',
				cost: new Decimal(5e10),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(5, 0, 2),
				visReq: () => ggte(5, 0, 50),
				purpose: 'Multiplies 1D bank efficiency by 2.'
			},
			{
				name: 'Cookie Investment',
				cost: new Decimal(5e13),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(5, 0, 2),
				visReq: () => ggte(5, 0, 100),
				purpose: 'Multiplies 1D bank efficiency by 2.'
			},
			// All Banks
			{
				name: 'Chocolate Credit',
				cost: new Decimal(6e18),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(5, 2),
				visReq: () => ggte(5, 1, 1),
				purpose: 'Multiplies bank efficiency by 2.'
			},
			{
				name: 'Capital Cookies',
				cost: new Decimal(6e30),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(5, 3),
				visReq: () => ggte(5, 2, 1),
				purpose: 'Multiplies bank efficiency by 3.'
			},
			{
				name: 'Sugar Treasury',
				cost: new Decimal(6e42),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(5, 4),
				visReq: () => ggte(5, 3, 1),
				purpose: 'Multiplies bank efficiency by 4.'
			},
			{
				name: 'ECTPOS',
				cost: new Decimal(6e54),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(5, 5),
				visReq: () => ggte(5, 4, 1),
				purpose: 'Multiplies bank efficiency by 5.'
			},
			{
				name: 'Online Cookies',
				cost: new Decimal(6e66),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(5, 6),
				visReq: () => ggte(5, 5, 1),
				purpose: 'Multiplies bank efficiency by 6.'
			},
			{
				name: 'Long Term Cookies',
				cost: new Decimal(6e78),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(5, 7),
				visReq: () => ggte(5, 6, 1),
				purpose: 'Multiplies bank efficiency by 7.'
			},
			{
				name: 'Mortgaged Cookies',
				cost: new Decimal(6e80),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(5, 8),
				visReq: () => ggte(5, 7, 1),
				purpose: 'Multiplies bank efficiency by 8.'
			},
			// 1D Temples
			{
				name: 'Moral Chocolate',
				cost: new Decimal(1e8),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(6, 0, 2),
				visReq: () => ggte(6, 0, 1),
				purpose: 'Multiplies 1D temple efficiency by 2.'
			},
			{
				name: 'Divine Cookies',
				cost: new Decimal(2e9),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(6, 0, 2),
				visReq: () => ggte(6, 0, 10),
				purpose: 'Multiplies 1D temple efficiency by 2.'
			},
			{
				name: 'Sacred Sugar',
				cost: new Decimal(2.5e10),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(6, 0, 2),
				visReq: () => ggte(6, 0, 25),
				purpose: 'Multiplies 1D temple efficiency by 2.'
			},
			{
				name: 'Ethical Chocolate',
				cost: new Decimal(1e12),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(6, 0, 2),
				visReq: () => ggte(6, 0, 50),
				purpose: 'Multiplies 1D temple efficiency by 2.'
			},
			{
				name: 'Sugarfree Sugar',
				cost: new Decimal(1e15),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(6, 0, 2),
				visReq: () => ggte(6, 0, 100),
				purpose: 'Multiplies 1D temple efficiency by 2.'
			},
			// All Temples
			{
				name: 'Chocolate Bible',
				cost: new Decimal(1e23),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(6, 2),
				visReq: () => ggte(6, 1, 1),
				purpose: 'Multiplies temple efficiency by 2.'
			},
			{
				name: 'Prayer to <strike>Orteil</strike> Reinhardt',
				cost: new Decimal(1e39),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(6, 3),
				visReq: () => ggte(6, 2, 1),
				purpose: 'Multiplies temple efficiency by 3.'
			},
			{
				name: 'Angelic Cookies',
				cost: new Decimal(1e53),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(6, 4),
				visReq: () => ggte(6, 3, 1),
				purpose: 'Multiplies temple efficiency by 4.'
			},
			{
				name: 'Principal Cookies',
				cost: new Decimal(1e68),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(6, 5),
				visReq: () => ggte(6, 4, 1),
				purpose: 'Multiplies temple efficiency by 5.'
			},
			{
				name: 'Virtuous Cookies',
				cost: new Decimal(1e83),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(6, 6),
				visReq: () => ggte(6, 5, 1),
				purpose: 'Multiplies temple efficiency by 6.'
			},
			{
				name: 'Cookie Dominions',
				cost: new Decimal(1e98),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(6, 7),
				visReq: () => ggte(6, 6, 1),
				purpose: 'Multiplies temple efficiency by 7.'
			},
			{
				name: 'Godlike Cookies',
				cost: new Decimal(1e113),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(6, 8),
				visReq: () => ggte(6, 7, 1),
				purpose: 'Multiplies temple efficiency by 8.'
			},
			// 1D Wizard Tower
			{
				name: 'Stone Walls',
				cost: new Decimal(9e8),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(7, 0, 2),
				visReq: () => ggte(7, 0, 1),
				purpose: 'Multiplies 1D wizard tower efficiency by 2.'
			},
			{
				name: 'Pointy Hats',
				cost: new Decimal(3e10),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(7, 0, 2),
				visReq: () => ggte(7, 0, 10),
				purpose: 'Multiplies 1D wizard tower efficiency by 2.'
			},
			{
				name: '<strike>Sticks</strike> Wands',
				cost: new Decimal(4e11),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(7, 0, 2),
				visReq: () => ggte(7, 0, 25),
				purpose: 'Multiplies 1D wizard tower efficiency by 2.'
			},
			{
				name: 'Lots of Pointy Hats',
				cost: new Decimal(1e13),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(7, 0, 2),
				visReq: () => ggte(7, 0, 50),
				purpose: 'Multiplies 1D wizard tower efficiency by 2.'
			},
			{
				name: 'Magical Interference',
				cost: new Decimal(1e16),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(7, 0, 2),
				visReq: () => ggte(7, 0, 1),
				purpose: 'Multiplies 1D wizard tower efficiency by 2.'
			},
			// All Wizard Towers
			{
				name: 'Pentagrams',
				cost: new Decimal(1e27),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(7, 2),
				visReq: () => ggte(7, 1, 1),
				purpose: 'Multiplies wizard tower efficiency by 2.'
			},
			{
				name: 'Heptagrams',
				cost: new Decimal(1e45),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(7, 3),
				visReq: () => ggte(7, 2, 1),
				purpose: 'Multiplies wizard tower efficiency by 3.'
			},
			{
				name: 'Octagrams',
				cost: new Decimal(1e63),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(7, 4),
				visReq: () => ggte(7, 3, 1),
				purpose: 'Multiplies wizard tower efficiency by 4.'
			},
			{
				name: 'Enneagrams',
				cost: new Decimal(1e81),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(7, 5),
				visReq: () => ggte(7, 4, 1),
				purpose: 'Multiplies wizard tower efficiency by 5.'
			},
			{
				name: 'Decagrams',
				cost: new Decimal(1e99),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(7, 6),
				visReq: () => ggte(7, 5, 1),
				purpose: 'Multiplies wizard tower efficiency by 6.'
			},
			{
				name: 'Hendecagrams',
				cost: new Decimal(1e117),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(7, 7),
				visReq: () => ggte(7, 6, 1),
				purpose: 'Multiplies wizard tower efficiency by 7.'
			},
			{
				name: 'Dodecagrams',
				cost: new Decimal(1e135),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(7, 8),
				visReq: () => ggte(7, 7, 1),
				purpose: 'Multiplies wizard tower efficiency by 8.'
			},
			// 1D Shipments
			{
				name: 'Man-made Sattelite',
				cost: new Decimal(2e10),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(8, 0, 2),
				visReq: () => ggte(8, 0, 1),
				purpose: 'Multiplies 1D shipment efficiency by 2.'
			},
			{
				name: 'Moon Mission',
				cost: new Decimal(5e11),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(8, 0, 2),
				visReq: () => ggte(8, 0, 10),
				purpose: 'Multiplies 1D shipment efficiency by 2.'
			},
			{
				name: 'Mars Mission: <strike>2020</strike> <strike>2030</strike> <strike>2040</strike> 2200',
				cost: new Decimal(6e12),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(8, 0, 2),
				visReq: () => ggte(8, 0, 25),
				purpose: 'Multiplies 1D shipment efficiency by 2.'
			},
			{
				name: 'Jovian Colony',
				cost: new Decimal(1e14),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(8, 0, 2),
				visReq: () => ggte(8, 0, 50),
				purpose: 'Multiplies 1D shipment efficiency by 2.'
			},
			{
				name: 'Titanian Civilisation',
				cost: new Decimal(2e17),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(8, 0, 2),
				visReq: () => ggte(8, 0, 100),
				purpose: 'Multiplies 1D shipment efficiency by 2.'
			},
			// All Shipments
			{
				name: 'Mars Colony',
				cost: new Decimal(3e31),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(8, 2),
				visReq: () => ggte(8, 1, 1),
				purpose: 'Multiplies shipment efficiency by 2.'
			},
			{
				name: 'Generation Ship',
				cost: new Decimal(3e52),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(8, 3),
				visReq: () => ggte(8, 2, 1),
				purpose: 'Multiplies shipment efficiency by 3.'
			},
			{
				name: 'Exoplanet Colony',
				cost: new Decimal(3e73),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(8, 4),
				visReq: () => ggte(8, 3, 1),
				purpose: 'Multiplies shipment efficiency by 4.'
			},
			{
				name: 'Dyson Sphere',
				cost: new Decimal(3e94),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(8, 5),
				visReq: () => ggte(8, 4, 1),
				purpose: 'Multiplies shipment efficiency by 5.'
			},
			{
				name: 'Black Hole Civilisation',
				cost: new Decimal(3e115),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(8, 6),
				visReq: () => ggte(8, 5, 1),
				purpose: 'Multiplies shipment efficiency by 6.'
			},
			{
				name: 'Galactic Control',
				cost: new Decimal(3e136),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(8, 7),
				visReq: () => ggte(8, 6, 1),
				purpose: 'Multiplies shipment efficiency by 7.'
			},
			{
				name: 'Imperial + Metric = Oops',
				cost: new Decimal(3e157),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(8, 8),
				visReq: () => ggte(8, 7, 1),
				purpose: 'Multiplies shipment efficiency by 8.'
			},
			// 1D Alchemy Labs
			{
				name: 'Gold to Cookies',
				cost: new Decimal(3e11),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(9, 0, 2),
				visReq: () => ggte(9, 0, 1),
				purpose: 'Multiplies 1D alchemy lab efficiency by 2.'
			},
			{
				name: 'Permanent Transformation',
				cost: new Decimal(6e12),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(9, 0, 2),
				visReq: () => ggte(9, 0, 10),
				purpose: 'Multiplies 1D alchemy lab efficiency by 2.'
			},
			{
				name: 'Sugar Essence',
				cost: new Decimal(5e13),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(9, 0, 2),
				visReq: () => ggte(9, 0, 25),
				purpose: 'Multiplies 1D alchemy lab efficiency by 2.'
			},
			{
				name: '1.79e308% Pure Chocolate',
				cost: new Decimal(2e15),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(9, 0, 2),
				visReq: () => ggte(9, 0, 50),
				purpose: 'Multiplies 1D alchemy lab efficiency by 2.'
			},
			{
				name: 'Muffins -> Cookies',
				cost: new Decimal(4e18),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(9, 0, 2),
				visReq: () => ggte(9, 0, 100),
				purpose: 'Multiplies 1D alchemy lab efficiency by 2.'
			},
			// All Alchemy Labs
			{
				name: 'Food of the Rich',
				cost: new Decimal(3e35),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(9, 2),
				visReq: () => ggte(9, 1, 1),
				purpose: 'Multiplies alchemy lab efficiency by 2.'
			},
			{
				name: 'Golden Cookies',
				cost: new Decimal(3e59),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(9, 3),
				visReq: () => ggte(9, 2, 1),
				purpose: 'Multiplies alchemy lab efficiency by 3.'
			},
			{
				name: 'Lead -> Gold -> Cookies',
				cost: new Decimal(3e83),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(9, 4),
				visReq: () => ggte(9, 3, 1),
				purpose: 'Multiplies alchemy lab efficiency by 4.'
			},
			{
				name: '<small>Pseudo</small>Science',
				cost: new Decimal(3e107),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(9, 5),
				visReq: () => ggte(9, 4, 1),
				purpose: 'Multiplies alchemy lab efficiency by 5.'
			},
			{
				name: 'Planetary Transformation',
				cost: new Decimal(3e131),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(9, 6),
				visReq: () => ggte(9, 5, 1),
				purpose: 'Multiplies alchemy lab efficiency by 6.'
			},
			{
				name: 'Gold Rush',
				cost: new Decimal(3e155),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(9, 7),
				visReq: () => ggte(9, 6, 1),
				purpose: 'Multiplies alchemy lab efficiency by 7.'
			},
			{
				name: 'Elixir of Chocolate',
				cost: new Decimal(3e179),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(9, 8),
				visReq: () => ggte(9, 7, 1),
				purpose: 'Multiplies alchemy lab efficiency by 8.'
			},
			// 1D Portals
			{
				name: 'Wormhole',
				cost: new Decimal(5e12),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(10, 0, 2),
				visReq: () => ggte(10, 0, 1),
				purpose: 'Multiplies 1D portal efficiency by 2.'
			},
			{
				name: 'Exotic Cookies',
				cost: new Decimal(1e14),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(10, 0, 2),
				visReq: () => ggte(10, 0, 10),
				purpose: 'Multiplies 1D portal efficiency by 2.'
			},
			{
				name: '-1% Chance of Survival',
				cost: new Decimal(1e15),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(10, 0, 2),
				visReq: () => ggte(10, 0, 25),
				purpose: 'Multiplies 1D portal efficiency by 2.'
			},
			{
				name: 'Where are These Cookies Even Coming From?',
				cost: new Decimal(3e16),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(10, 0, 2),
				visReq: () => ggte(10, 0, 50),
				purpose: 'Multiplies 1D portal efficiency by 2.'
			},
			{
				name: 'Trisected Angles',
				cost: new Decimal(3e19),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(10, 0, 2),
				visReq: () => ggte(10, 0, 100),
				purpose: 'Multiplies 1D portal efficiency by 2.'
			},
			// All Portals
			{
				name: 'Parallel Cookieverse',
				cost: new Decimal(1e40),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(10, 2),
				visReq: () => ggte(10, 1, 1),
				purpose: 'Multiplies portal efficiency by 2.'
			},
			{
				name: 'Alternate Cookieverse',
				cost: new Decimal(1e67),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(10, 3),
				visReq: () => ggte(10, 2, 1),
				purpose: 'Multiplies portal efficiency by 3.'
			},
			{
				name: 'Multidimensional Cookies',
				cost: new Decimal(1e94),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(10, 4),
				visReq: () => ggte(10, 3, 1),
				purpose: 'Multiplies portal efficiency by 4.'
			},
			{
				name: 'Dilated Space',
				cost: new Decimal(1e121),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(10, 5),
				visReq: () => ggte(10, 4, 1),
				purpose: 'Multiplies portal efficiency by 5.'
			},
			{
				name: 'Rematerialised Cookies',
				cost: new Decimal(1e148),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(10, 6),
				visReq: () => ggte(10, 5, 1),
				purpose: 'Multiplies portal efficiency by 6.'
			},
			{
				name: 'Uncookies',
				cost: new Decimal(1e175),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(10, 7),
				visReq: () => ggte(10, 6, 1),
				purpose: 'Multiplies portal efficiency by 7.'
			},
			{
				name: 'Biscuts',
				cost: new Decimal(1e202),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(10, 8),
				visReq: () => ggte(10, 7, 1),
				purpose: 'Multiplies portal efficiency by 8.'
			},
			// 1D Time Machine
			{
				name: 'Time Dilation',
				cost: new Decimal(5e13),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(11, 0, 2),
				visReq: () => ggte(11, 0, 1),
				purpose: 'Multiplies 1D time machine efficiency by 2.'
			},
			{
				name: 'CPT Asymmetry',
				cost: new Decimal(1e15),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(11, 0, 2),
				visReq: () => ggte(11, 0, 10),
				purpose: 'Multiplies 1D time machine efficiency by 2.'
			},
			{
				name: 'Calculus of Temporal Dimensions',
				cost: new Decimal(1e16),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(11, 0, 2),
				visReq: () => ggte(11, 0, 25),
				purpose: 'Multiplies 1D time machine efficiency by 2.'
			},
			{
				name: 'Topology of Temporal Dimensions',
				cost: new Decimal(5e17),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(11, 0, 2),
				visReq: () => ggte(11, 0, 50),
				purpose: 'Multiplies 1D time machine efficiency by 2.'
			},
			{
				name: '2 Temporal Dimensions?',
				cost: new Decimal(5e20),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(11, 0, 2),
				visReq: () => ggte(11, 0, 100),
				purpose: 'Multiplies 1D time machine efficiency by 2.'
			},
			// All Time Machines
			{
				name: '5D Spacetime',
				cost: new Decimal(5e43),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(11, 2),
				visReq: () => ggte(11, 1, 1),
				purpose: 'Multiplies time machine efficiency by 2.'
			},
			{
				name: 'Everything\'s Relative',
				cost: new Decimal(5e73),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(11, 3),
				visReq: () => ggte(11, 2, 1),
				purpose: 'Multiplies time machine efficiency by 3.'
			},
			{
				name: 'Speed of Light',
				cost: new Decimal(5e103),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(11, 4),
				visReq: () => ggte(11, 3, 1),
				purpose: 'Multiplies time machine efficiency by 4.'
			},
			{
				name: 'Speed of Light Squared',
				cost: new Decimal(5e133),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(11, 5),
				visReq: () => ggte(11, 4, 1),
				purpose: 'Multiplies time machine efficiency by 5.'
			},
			{
				name: 'Speed of Potato',
				cost: new Decimal(5e163),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(11, 6),
				visReq: () => ggte(11, 5, 1),
				purpose: 'Multiplies time machine efficiency by 6.'
			},
			{
				name: 'Tachyonic Field',
				cost: new Decimal(5e193),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(11, 7),
				visReq: () => ggte(11, 6, 1),
				purpose: 'Multiplies time machine efficiency by 7.'
			},
			{
				name: 'Yes',
				cost: new Decimal(5e223),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(11, 8),
				visReq: () => ggte(11, 7, 1),
				purpose: 'Multiplies time machine efficiency by 8.'
			},
			// 1D Antimatter Condenser
			{
				name: 'Is This Why There is More Matter than Antimatter?',
				cost: new Decimal(6e14),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(12, 0, 2),
				visReq: () => ggte(12, 0, 1),
				purpose: 'Multiplies 1D antimatter condenser efficiency by 2.'
			},
			{
				name: 'Antichocolate',
				cost: new Decimal(1e16),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(12, 0, 2),
				visReq: () => ggte(12, 0, 10),
				purpose: 'Multiplies 1D antimatter condenser efficiency by 2.'
			},
			{
				name: 'Annihilation',
				cost: new Decimal(1e17),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(12, 0, 2),
				visReq: () => ggte(12, 0, 25),
				purpose: 'Multiplies 1D antimatter condenser efficiency by 2.'
			},
			{
				name: 'Anticookie',
				cost: new Decimal(6e18),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(12, 0, 2),
				visReq: () => ggte(12, 0, 50),
				purpose: 'Multiplies 1D antimatter condenser efficiency by 2.'
			},
			{
				name: '100% Energy Release',
				cost: new Decimal(7e21),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(12, 0, 2),
				visReq: () => ggte(12, 0, 100),
				purpose: 'Multiplies 1D antimatter condenser efficiency by 2.'
			},
			// All Antimatter Condensers
			{
				name: 'Quantum Flux',
				cost: new Decimal(5e47),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(12, 2),
				visReq: () => ggte(12, 1, 1),
				purpose: 'Multiplies antimatter condenser efficiency by 2.'
			},
			{
				name: 'Bose-Einstein Condesate',
				cost: new Decimal(5e80),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(12, 3),
				visReq: () => ggte(12, 2, 1),
				purpose: 'Multiplies antimatter condenser efficiency by 3.'
			},
			{
				name: 'Solid Helium',
				cost: new Decimal(5e113),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(12, 4),
				visReq: () => ggte(12, 3, 1),
				purpose: 'Multiplies antimatter condenser efficiency by 4.'
			},
			{
				name: 'Strange Matter',
				cost: new Decimal(5e146),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(12, 5),
				visReq: () => ggte(12, 4, 1),
				purpose: 'Multiplies antimatter condenser efficiency by 5.'
			},
			{
				name: 'Charmed Matter',
				cost: new Decimal(5e179),
				icon: 'assets/img/cookie.png', 
				onBuy: () => mag(12, 6),
				visReq: () => ggte(12, 5, 1),
				purpose: 'Multiplies antimatter condenser efficiency by 6.'
			},
			{
				name: 'Muonic Matter',
				cost: new Decimal(5e212),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(12, 7),
				visReq: () => ggte(12, 6, 1),
				purpose: 'Multiplies antimatter condenser efficiency by 7.'
			},
			{
				name: 'Antimatter Dimensions',
				cost: new Decimal(5e245),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(12, 8),
				visReq: () => ggte(12, 7, 1),
				purpose: 'Multiplies antimatter condenser efficiency by 8.'
			},
			// 1D Prisms
			{
				name: 'Refraction',
				cost: new Decimal(1e16),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(13, 0, 2),
				visReq: () => ggte(13, 0, 1),
				purpose: 'Multiplies 1D prism efficiency by 2.'
			},
			{
				name: 'Photonic Molecules',
				cost: new Decimal(2e17),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(13, 0, 2),
				visReq: () => ggte(13, 0, 10),
				purpose: 'Multiplies 1D prism efficiency by 2.'
			},
			{
				name: 'OooOHHhH, ShiNY',
				cost: new Decimal(2e18),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(13, 0, 2),
				visReq: () => ggte(13, 0, 25),
				purpose: 'Multiplies 1D prism efficiency by 2.'
			},
			{
				name: 'Photonic Chocolate',
				cost: new Decimal(9e19),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(13, 0, 2),
				visReq: () => ggte(13, 0, 50),
				purpose: 'Multiplies 1D prism efficiency by 2.'
			},
			{
				name: 'Photonic Cookies',
				cost: new Decimal(8e22),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(13, 0, 2),
				visReq: () => ggte(13, 0, 100),
				purpose: 'Multiplies 1D prism efficiency by 2.'
			},
			// All Prisms
			{
				name: 'Visible Cookies',
				cost: new Decimal(1e55),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(13, 2),
				visReq: () => ggte(13, 1, 1),
				purpose: 'Multiplies prism efficiency by 2.'
			},
			{
				name: 'Infrared Cookies',
				cost: new Decimal(1e94),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(13, 3),
				visReq: () => ggte(13, 2, 1),
				purpose: 'Multiplies prism efficiency by 3.'
			},
			{
				name: 'Microwave Cookies',
				cost: new Decimal(1e133),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(13, 4),
				visReq: () => ggte(13, 3, 1),
				purpose: 'Multiplies prism efficiency by 4.'
			},
			{
				name: 'Radio Cookies',
				cost: new Decimal(1e172),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(13, 5),
				visReq: () => ggte(13, 4, 1),
				purpose: 'Multiplies prism efficiency by 5.'
			},
			{
				name: 'Ultraviolet Cookies',
				cost: new Decimal(1e211),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(13, 6),
				visReq: () => ggte(13, 5, 1),
				purpose: 'Multiplies prism efficiency by 6.'
			},
			{
				name: 'X-Ray Cookies',
				cost: new Decimal(1e250),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(13, 7),
				visReq: () => ggte(13, 6, 1),
				purpose: 'Multiplies prism efficiency by 7.'
			},
			{
				name: 'Gamma Cookies',
				cost: new Decimal(1e289),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(13, 8),
				visReq: () => ggte(13, 7, 1),
				purpose: 'Multiplies prism efficiency by 8.'
			},
			// 1D Chancemakers
			{
				name: 'D4',
				cost: new Decimal(6e16),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(14, 0, 2),
				visReq: () => ggte(14, 0, 1),
				purpose: 'Multiplies 1D chancemaker efficiency by 2.'
			},
			{
				name: 'D6',
				cost: new Decimal(1e18),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(14, 0, 2),
				visReq: () => ggte(14, 0, 10),
				purpose: 'Multiplies 1D chancemaker efficiency by 2.'
			},
			{
				name: 'D8',
				cost: new Decimal(2e19),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(14, 0, 2),
				visReq: () => ggte(14, 0, 25),
				purpose: 'Multiplies 1D chancemaker efficiency by 2.'
			},
			{
				name: 'D12',
				cost: new Decimal(5e20),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(14, 0, 2),
				visReq: () => ggte(14, 0, 50),
				purpose: 'Multiplies 1D chancemaker efficiency by 2.'
			},
			{
				name: 'D20',
				cost: new Decimal(5e23),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(14, 0, 2),
				visReq: () => ggte(14, 0, 100),
				purpose: 'Multiplies 1D chancemaker efficiency by 2.'
			},
			// All Chancemakers
			{
				name: 'Probably',
				cost: new Decimal(5e61),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(14, 2),
				visReq: () => ggte(14, 1, 1),
				purpose: 'Multiplies chancemaker efficiency by 2.'
			},
			{
				name: 'Independent Events',
				cost: new Decimal(5e106),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(14, 3),
				visReq: () => ggte(14, 2, 1),
				purpose: 'Multiplies chancemaker efficiency by 3.'
			},
			{
				name: 'Low Chance * Big Number = Big Chance',
				cost: new Decimal(5e151),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(14, 4),
				visReq: () => ggte(14, 3, 1),
				purpose: 'Multiplies chancemaker efficiency by 4.'
			},
			{
				name: '4 Leafed Clover',
				cost: new Decimal(5e196),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(14, 5),
				visReq: () => ggte(14, 4, 1),
				purpose: 'Multiplies chancemaker efficiency by 5.'
			},
			{
				name: '8 Leafed Clover',
				cost: new Decimal(5e241),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(14, 6),
				visReq: () => ggte(14, 5, 1),
				purpose: 'Multiplies chancemaker efficiency by 6.'
			},
			{
				name: '16 Leafed Clover',
				cost: new Decimal(5e286),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(14, 7),
				visReq: () => ggte(14, 6, 1),
				purpose: 'Multiplies chancemaker efficiency by 7.'
			},
			{
				name: '256 Leafed Clover',
				cost: new Decimal('5e331'),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(14, 8),
				visReq: () => ggte(14, 7, 1),
				purpose: 'Multiplies chancemaker efficiency by 8.'
			},
			// 1D Fractal Engines
			{
				name: 'Iteration',
				cost: new Decimal(1e18),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(15, 0, 2),
				visReq: () => ggte(15, 0, 1),
				purpose: 'Multiplies 1D fractal engine efficiency by 2.'
			},
			{
				name: 'Meta-Iteration',
				cost: new Decimal(4e19),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(15, 0, 2),
				visReq: () => ggte(15, 0, 10),
				purpose: 'Multiplies 1D fractal engine efficiency by 2.'
			},
			{
				name: 'Recursion',
				cost: new Decimal(5e20),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(15, 0, 2),
				visReq: () => ggte(15, 0, 25),
				purpose: 'Multiplies 1D fractal engine efficiency by 2.'
			},
			{
				name: 'Complex Numbers',
				cost: new Decimal(1e22),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(15, 0, 2),
				visReq: () => ggte(15, 0, 50),
				purpose: 'Multiplies 1D fractal engine efficiency by 2.'
			},
			{
				name: 'Quaternions',
				cost: new Decimal(1e25),
				icon: 'assets/img/cookie.png',
				onBuy: () => mg(15, 0, 2),
				visReq: () => ggte(15, 0, 100),
				purpose: 'Multiplies 1D fractal engine efficiency by 2.'
			},
			// All Fractal Engines
			{
				name: 'Julia Set',
				cost: new Decimal(1e75),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(15, 2),
				visReq: () => ggte(15, 1, 1),
				purpose: 'Multiplies fractal engine efficiency by 2.'
			},
			{
				name: 'Mandelbrot Set',
				cost: new Decimal(1e125),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(15, 3),
				visReq: () => ggte(15, 2, 1),
				purpose: 'Multiplies fractal engine efficiency by 3.'
			},
			{
				name: 'Hilbert Curve',
				cost: new Decimal(1e175),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(15, 4),
				visReq: () => ggte(15, 3, 1),
				purpose: 'Multiplies fractal engine efficiency by 4.'
			},
			{
				name: 'Peano Curve',
				cost: new Decimal(1e225),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(15, 5),
				visReq: () => ggte(15, 4, 1),
				purpose: 'Multiplies fractal engine efficiency by 5.'
			},
			{
				name: 'Sierpinski Triangle',
				cost: new Decimal(1e275),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(15, 6),
				visReq: () => ggte(15, 5, 1),
				purpose: 'Multiplies fractal engine efficiency by 6.'
			},
			{
				name: 'Infinite Surface Area, Finite Volume',
				cost: new Decimal('1e325'),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(15, 7),
				visReq: () => ggte(15, 6, 1),
				purpose: 'Multiplies fractal engine efficiency by 7.'
			},
			{
				name: 'Menger Sponge',
				cost: new Decimal('1e375'),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(15, 8),
				visReq: () => ggte(15, 7, 1),
				purpose: 'Multiplies fractal engine efficiency by 8.'
			},
      // Unfunity upgrades
			{
				name: 'Unfun Cookies',
				cost: new Decimal('1e250'),
				icon: 'assets/img/cookie.png',
				onBuy: () => mag(15, 8),
				visReq: () => ggte(15, 7, 1),
				purpose: 'Multiplies unfunity power gain by 2.'
			}
		]
		
		this.achievementData = [
			// Cookie Achievements
			{
				name: 'I Have a Cookie',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(1),
				unlockTxt: 'Baked 1 cookie'
			},
			{
				name: 'Double the Calories',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(2),
				unlockTxt: 'Baked 2 cookies'
			},
			{
				name: 'I Need More Chocolate Chips',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(10),
				unlockTxt: 'Baked 10 cookies'
			},
			{
				name: 'Sugar Craving',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(25),
				unlockTxt: 'Bake 25 cookies'
			},
			{
				name: 'Addiction',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(50),
				unlockTxt: 'Bake 50 cookies'
			},
			{
				name: 'You Can\'t Stop Now!',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(100),
				unlockTxt: 'Bake 100 cookies'
			},
			{
				name: 'Well Yes, But Actually Cookies',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(250),
				unlockTxt: 'Bake 250 cookies'
			},
			{
				name: '<strike>STONKS</strike> COOKIES',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(500),
				unlockTxt: 'Bake 500 cookies'
			},
			{
				name: 'New SI Unit: Kilocookie',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(1000),
				unlockTxt: 'Bake 1K cookies'
			},
			{
				name: 'Much Cookie',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(5000),
				unlockTxt: 'Bake 5K cookies'
			},
			{
				name: 'Only 102% Sugar!',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(10000),
				unlockTxt: 'Bake 10K cookies'
			},
			{
				name: 'Just One More',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(100000),
				unlockTxt: 'Bake 100K cookies'
			},
			{
				name: 'New SI Unit: Megacookie',
				icon: 'assets/img/cookie.png',
				unlockReq: () => tcgte(1000000),
				unlockTxt: 'Bake 1M cookies'
			},
			// 1D Cursors
			{
				name: 'Click',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 0, 1),
				unlockTxt: 'Have a 1D cursor'
			},
			{
				name: 'Double Click',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 0, 2),
				unlockTxt: 'Have 2 1D cursors'
			},
			{
				name: 'Look Ma, Two Hands!',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 0, 10),
				unlockTxt: 'Have 10 1D cursors'
			},
			{
				name: '5 Hands is Better Than 1',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 0, 25),
				unlockTxt: 'Have 25 1D cursors'
			},
			{
				name: 'Fifty Fingers',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 0, 50),
				unlockTxt: 'Have 50 1D cursors'
			},
			{
				name: 'Hundred Fingers',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 0, 100),
				unlockTxt: 'Have 100 1D cursors'
			},
			// All Cursors
			{
				name: 'Slap',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 1, 1),
				unlockTxt: 'Have 1 2D cursor'
			},
			{
				name: 'With (not really) 3D Graphics',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 2, 1),
				unlockTxt: 'Have 1 3D cursor'
			},
			{
				name: 'Stereographic Projection',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 3, 1),
				unlockTxt: 'Have 1 4D cursor'
			},
			{
				name: 'Orthographic Projection',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 4, 1),
				unlockTxt: 'Have 1 5D cursor'
			},
			{
				name: 'Projection Matrices',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 5, 1),
				unlockTxt: 'Have 1 6D cursor'
			},
			{
				name: 'Sphere Inside the Outside of a Sphere',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 6, 1),
				unlockTxt: 'Have 1 7D cursor'
			},
			{
				name: 'Click Lattice',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(0, 7, 1),
				unlockTxt: 'Have 1 8D cursor'
			},
			// 1D Grandmas
			{
				name: 'Nice Grandma',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 0, 1),
				unlockTxt: 'Have a 1D grandma'
			},
			{
				name: 'Nice Grandmas',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 0, 10),
				unlockTxt: 'Have 10 1D grandmas'
			},
			{
				name: 'Lots of Nice Grandmas',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 0, 25),
				unlockTxt: 'Have 25 1D grandma'
			},
			{
				name: 'Too Many Nice Grandmas',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 0, 50),
				unlockTxt: 'Have 50 1D grandmas'
			},
			{
				name: 'Death by Warm Hugs',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 0, 100),
				unlockTxt: 'Have 100 1D grandmas'
			},
			// All Grandmas
			{
				name: 'Square Glasses',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 1, 1),
				unlockTxt: 'Have a 2D grandma'
			},
			{
				name: 'Knitted Sweaters',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 2, 1),
				unlockTxt: 'Have a 3D grandma'
			},
			{
				name: 'Propreantepenultimate Grandma',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 3, 1),
				unlockTxt: 'Have a 4D grandma'
			},
			{
				name: 'Preantepenultimate Grandma',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 4, 1),
				unlockTxt: 'Have a 5D grandma'
			},
			{
				name: 'Antepenultimate Grandma',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 5, 1),
				unlockTxt: 'Have a 6D grandma'
			},
			{
				name: 'Penultimate Grandma',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 6, 1),
				unlockTxt: 'Have a 7D grandma'
			},
			{
				name: 'Ultimate Grandma',
				icon: 'assets/img/cookie.png',
				unlockReq: () => ggte(1, 4, 1),
				unlockTxt: 'Have an 8D grandma<br>"This isn\'t even my final form!"'
			}
		]
		
		// End Data Objects
		
		this.upgrades = [];
		this.boughtUpgrades = 0;
		
		for (let i = 0; i < this.upgradeData.length; i++) {
			this.upgrades[i] = new Upgrade(this.upgradeData[i].name, this.upgradeData[i].cost, false, this.upgradeData[i].icon, this.upgradeData[i].onBuy, this.upgradeData[i].visReq);
		}
		
		this.achievements = [];
		this.unlockedAchievements = 0;
		
		for (let i = 0; i < this.achievementData.length; i++) {
			this.achievements[i] = new Achievement(i, this.achievementData[i].name, this.achievementData[i].icon, this.achievementData[i].unlockReq, false);
		}
		
		this.buyAmount = new Decimal(1);
		document.getElementById('bulk').value = this.buyAmount;
		this.buymax = false;
		
		this.tab = 0;
		this.subtab = 0;
		this.shoptab = 0;
		
		this.autosave = true;
		this.autosaveintv = 10;
		document.getElementById('asintv').value = this.autosaveintv;

		this.vers = '1.3.4';
		
		if (data != undefined) {
			try {
				this.cookies = new Decimal(data.cookies);
				this.clickPro = new Decimal(data.clickPro);
				this.cookieClicks = data.cookieClicks;
				this.cookiesFromClicks = new Decimal(data.cookiesFromClicks);
				this.totalProdCookies = new Decimal(data.totalProdCookies);
				this.tps = new Decimal(data.tps);
				this.tpsc = new Decimal(data.tpsc);
				this.tsu = new Decimal(data.tsu);
        
        this.unfunityPoints = new Decimal(data.unfunityPoints)
        this.unfunityGalaxies = new Decimal(data.unfunityGalaxies)
        this.unfunityPointsMult = new Decimal(data.unfunityPointsMult)
				
				for (let i = 0; i < data.generators.length; i++) {
					this.generators[i] = [];
					for (let j = 0; j < data.generators[i].length; j++) {
						if (data.generators[i][j].amount && data.generators[i][j].bought) {
							this.generators[i][j] = new Generator(i, j, data.generators[i][j].amount, data.generators[i][j].bought, 1);
						} else {
							this.generators[i][j] = new Generator(i, j, 0, 0, 1);
						}
					}
				}
				
				if (data.unlockedGens) {
					for (let i = 0; i < 16; i++) {
						this.unlockedGens[i] = data.unlockedGens[i];
					}
				}
				
				for (let i = 0; i < data.upgrades.length; i++) {
					if (data.upgrades[i].bought) {
						this.boughtUpgrades++;
					}
					this.upgrades[i] = new Upgrade(this.upgradeData[i].name, this.upgradeData[i].cost, data.upgrades[i].bought, this.upgradeData[i].icon, this.upgradeData[i].onBuy, this.upgradeData[i].visReq);
				}
				
				for (let i = 0; i < data.achievements.length; i++) {
					if (data.achievements[i].unlocked) {
						this.unlockedAchievements++;
					}
					this.achievements[i] = new Achievement(i, this.achievementData[i].name, this.achievementData[i].icon, this.achievementData[i].unlockReq, data.achievements[i].unlocked);
				}
				
				this.buyAmount = new Decimal(data.buyAmount);
				document.getElementById('bulk').value = this.buyAmount;
				this.buymax = data.buymax;
				
				this.tab = data.tab;
				this.subtab = data.subtab;
				this.shoptab = data.shoptab;
				
				this.autosave = data.autosave;
				this.autosaveintv = data.autosaveintv;
				document.getElementById('asintv').value = this.autosaveintv;
			} catch(e) {
				console.log(e);
			}
		}
	}
}