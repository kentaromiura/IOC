describe("IOC.js", function(){
	var unit1 = new IOC.Unit(),
		unit2 = new IOC.Unit(),

		IWeapon = new Class({
			hit: function(){console.log('hit method must be implemented'); }
		}),
		Shuriken = new Class({
			Extends: IWeapon,
			hit:function(who){return("Pierced "+who+" armor");}
		}),
		Sword = new Class({
			Extends : IWeapon,
			hit:function(who){return("Chopped "+who+" in half");}
		}),

		Samurai = new Class({
			weapon : IWeapon,
			initialize: function(weapon){
				this.weapon = weapon;
			},
			Attack: function(who){
				return this.weapon.hit(who);
			}
		});

		unit1.Bind(IWeapon).To(Sword);
		unit2.Bind(IWeapon).To(Shuriken);

	it("can be used to autoconfigure dependency using setter injection", function(){
		expect(unit1.Get(Samurai).Attack('The evildoers')).to.be('Chopped The evildoers in half');
		expect(unit2.Get(Samurai).Attack('The evildoers')).to.be('Pierced The evildoers armor');
	})

})