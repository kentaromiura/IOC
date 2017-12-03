let id = 0;  
const containers = {};

export default class IOC {
	constructor() {
		this.id = id++;
		containers[this.id] = []
	}
	
	find(id) {
		return containers[this.id][id];
	}
	
	register(id, type) {
		containers[this.id][id] = type;
	}
	
	byConstructor(id, ...params) {
		const type = this.find(id);
		return new type(...params);
	}
	
	bySetter(id, setter, ...params) {
		const type = this.find(id);
		const instance = new type(...params);
		return Object.assign(instance, setter);
	}
};