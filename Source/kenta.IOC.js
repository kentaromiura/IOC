/*
---
name: kenta.IOC
description: IOC for MooTools
authors: Cristian Carlesso http://mykenta.blogspot.com
copyright: Cristian Carlesso
license: MIT-style license.
version: 2.0
#requires: []
provides: [IOC]
...
*/

!function(global){
	var slice = Array.prototype.slice
	var containers = {}
	global.IOC = new Class({

		initialize:    function(){
			this.id = String.uniqueID()
			containers[this.id] = []
		},
		find:          function(id){
			return containers[this.id][id]
		},
		register:      function(id, klass){
			containers[this.id][id] = klass
		},
		byConstructor: function(id, params){
			var args = slice.call(arguments)
			var klass = this.find(args.shift())

			var initialize = klass.prototype.initialize
			delete klass.prototype.initialize

			var instance = new klass

			if (initialize) {
				klass.prototype.initialize = initialize
				initialize.apply(instance, args)
			}
			return instance
		},
		bySetter:      function(id, setter){
			var args = slice.call(arguments)
			var klass = this.find(args.shift())

			var initialize = klass.prototype.initialize
			delete klass.prototype.initialize

			var instance = new klass

			if (initialize) {
				klass.prototype.initialize = initialize
			}

			return Object.merge(instance, setter)
		}
	})
}(this)