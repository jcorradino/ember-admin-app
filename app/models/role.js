import DS from 'ember-data';

export default DS.Model.extend({
	roleName: DS.attr('string'),
	permission: DS.attr('number')
});
