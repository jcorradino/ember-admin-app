import Ember from 'ember';

export default Ember.Helper.extend({
	compute(values) {
		var start = values[0];
		var count = values[1];

		var ret = [];
		for(var i = 0; i < count; i++) {
			ret.push(i+start);
		}
		return ret;
	}
});