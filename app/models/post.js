import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	author: DS.belongsTo('user'),
	content: DS.attr('string'),
	status: DS.attr('string'),
	tags: DS.hasMany('taxonomy'),
	collection: DS.belongsTo('collection')
});
