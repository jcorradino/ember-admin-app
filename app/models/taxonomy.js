import DS from 'ember-data';

export default DS.Model.extend({
	// key: DS.attr('string'),
	name: DS.attr('string'),
	type: DS.attr('string'),
	// posts: DS.hasMany('post')
});
