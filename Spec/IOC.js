describe("IOC.js", function(){
	var container = new IOC(),
		shuriken = new Class({
			hit:function(who){return("Pierced "+who+" armor");}
		}),

		sword = new Class({
			hit:function(who){return("Chopped "+who+" in half");}
		}),

		Samurai = new Class({
			initialize: function(weapon){
				this.weapon = weapon;
			},
			Attack: function(who){
				return this.weapon.hit(who);
			}
		});

	it("can be used to inject things using constructor injection", function(){
		container.register("samurai", Samurai);
		var warrior1 = container.byConstructor("samurai", new shuriken),
			warrior2 = container.byConstructor("samurai", new sword);

		expect(warrior1 instanceof Samurai).to.be.ok();
		expect(warrior2 instanceof Samurai).to.be.ok();

		expect(warrior1.Attack("The evildoers")).to.be('Pierced The evildoers armor');
		expect(warrior2.Attack("The evildoers")).to.be('Chopped The evildoers in half');
	})

	it("can be used to inject things using setter injection", function(){
		container.register("samurai", Samurai);
		var warrior1 = container.bySetter("samurai", {weapon: new shuriken}),
			warrior2 = container.bySetter("samurai", {weapon: new sword});

		expect(warrior1 instanceof Samurai).to.be.ok();
		expect(warrior2 instanceof Samurai).to.be.ok();

		expect(warrior1.Attack("The evildoers")).to.be('Pierced The evildoers armor');
		expect(warrior2.Attack("The evildoers")).to.be('Chopped The evildoers in half');
	})

})