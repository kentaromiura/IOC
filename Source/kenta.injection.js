/*
 ---
 name: kenta.IOC.Unit
 description: Ninject style configurator for IOC
 authors: Cristian Carlesso http://mykenta.blogspot.com
 copyright: Cristian Carlesso
 license: MIT-style license.
 requires: [IOC]
 provides: [injection]
 ...
 */

!function(global){
	var IOC = global.IOC,
	Configuration = new Class({
		bindings: [],
		initialize: function(){
			this.bindings = [];
		},
		Bind: function(base, to){
			var self = this;
			var tmp = {
				To : function(to){
					self.bindings.push({base: base, bind: new to});
				}
			}

			if(to){
				tmp.To(to);
			}else{
				return tmp;
			}
		}
	});

	IOC.Unit = new Class({
		initialize:function(){
			this.configuration = new Configuration();
		},
		Bind: function(a, b){
			return this.configuration.Bind(a, b);
		},
		Get: function(klass){
			var container = new IOC();
			container.register('x', klass);
			var setter = {};
			var proto = klass.prototype;
			var binding = this.configuration.bindings;
			for(var prop in proto){
				for(var i= 0, max= binding.length;i<max;i++){
					if(binding[i].base == proto[prop]){
						setter[prop] = binding[i].bind;
					}
				}
			}
			return container.bySetter('x', setter);
		}
	});

}(this)