import DS from 'ember-data';

export default DS.Model.extend({
	"user-name": DS.attr('string'),
	"full-name": DS.attr('string'),
	"role-name": DS.belongsTo('role'),
	// posts: DS.hasMany('post')
});
