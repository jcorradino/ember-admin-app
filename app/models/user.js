import DS from 'ember-data';

export default DS.Model.extend({
	username: DS.attr('string'),
	token: DS.attr('string'),
	roleName: DS.belongsTo('role'),
	posts: DS.hasMany('post')
});
