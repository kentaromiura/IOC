import IOC from './IOC';

class Configuration {
	constructor() {
		this.bindings = [];
	}

	bind(base, to) {
		const partial = {
			to: to => {
				this.bindings.push({
					base,
					bind: to
				});
			}
		};
		if (to === undefined) {
			return partial;
		}
		partial.to(to);
	}

	getSetterFor(type) {
		const setter = {};
		const bindings = this.bindings;
		for (const prop in type) {
			for (let i = 0, max = bindings.length; i < max; i++) {
				if (bindings[i].base == type[prop]) {
					setter[prop] = new bindings[i].bind;
				}
			}
		}
		return setter;
	}
}

export default class Unit {
	constructor() {
		this.configuration = new Configuration();
	}

	bind(base, to) {
		return this.configuration.bind(base, to);
	}

	get(type, ...params) {
		const container = new IOC();
		container.register('x', type);
		const setter = this.configuration.getSetterFor(type);
		return container.bySetter('x', setter, ...params);
	}
}
