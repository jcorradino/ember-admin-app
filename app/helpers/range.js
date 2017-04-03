import Ember from 'ember';

export default Ember.Helper.extend({
	compute(values) {
		let start = values[0];
		let end = values[1]+1;
		let ret = [];
		for(let i = start; i < end; i++) {
			ret.push(i);
		}
		return ret;
	}
});