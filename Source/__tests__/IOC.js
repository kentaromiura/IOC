import {IOC} from '..';

describe("IOC", function(){
	const container = new IOC(),
		Shuriken = class {
			hit(who) {
				return("Pierced " + who + " armor")
			}
		},
		Sword = class {
			hit(who) {
				return("Chopped " + who + " in half")
			}
		},
		Samurai = class {
			constructor(weapon) {
				this.weapon = weapon
			}
			attack(who) {
				return this.weapon.hit(who)
			}
		}

	it("can be used to inject dependencies using constructor injection", function(){
		container.register("samurai", Samurai)
		const warrior1 = container.byConstructor("samurai", new Shuriken),
			warrior2 = container.byConstructor("samurai", new Sword)

		expect(warrior1 instanceof Samurai).toBe(true)
		expect(warrior2 instanceof Samurai).toBe(true)

		expect(warrior1.attack("The evildoers")).toBe('Pierced The evildoers armor')
		expect(warrior2.attack("The evildoers")).toBe('Chopped The evildoers in half')
	})

	it("can be used to inject dependencies using setter injection", function(){
		container.register("samurai", Samurai)
		const warrior1 = container.bySetter("samurai", {weapon: new Shuriken}),
			warrior2 = container.bySetter("samurai", {weapon: new Sword})

		expect(warrior1 instanceof Samurai).toBe(true)
		expect(warrior2 instanceof Samurai).toBe(true)

		expect(warrior1.attack("The evildoers")).toBe('Pierced The evildoers armor')
		expect(warrior2.attack("The evildoers")).toBe('Chopped The evildoers in half')
	})
})
