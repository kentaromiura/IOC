import {Unit} from '..';

describe("Unit", function(){
	const unit1 = new Unit(),
		unit2 = new Unit(),

		IWeapon = class {
			hit() {
				console.log('hit method must be implemented')
			}
		},			
		/* 
		Entending is not needed
		but I think it a good way to organize your code
		and at the same time it explains what the Class does just by looking at the code :)
		*/
		Shuriken = class extends IWeapon {
			hit(who) {
				return("Pierced " + who + " armor")
			}
		},
		Sword = class extends IWeapon {
			hit(who){
				return("Chopped " + who + " in half")
			}
		},
		Samurai = class {
			static weapon = IWeapon;
			constructor(weapon) {
				this.weapon = weapon
			}
			attack(who) {
				return this.weapon.hit(who)
			}
		}
	// in unit 1 we will link configure IWeapon to be Sword instances	
	unit1.bind(IWeapon).to(Sword)
	// while in unit 2 those will be Shuriken
	unit2.bind(IWeapon).to(Shuriken)

	it("can be used to autoconfigure dependency using setter injection", function(){
		expect(unit1.get(Samurai).attack('The evildoers')).toBe('Chopped The evildoers in half')
		expect(unit2.get(Samurai).attack('The evildoers')).toBe('Pierced The evildoers armor')
	})
	
	it("can be used to autoconfigure dependency using setter injection", function(){
		class Ninja {
			static weapon = IWeapon;
			attack(who) {
				return this.weapon.hit(who) + ' without being spotted';
			}
		}
		expect(unit1.get(Ninja).attack('The evildoers')).toBe('Chopped The evildoers in half without being spotted')
		expect(unit2.get(Ninja).attack('The evildoers')).toBe('Pierced The evildoers armor without being spotted')
	})
	

})