import DS from 'ember-data';
import env from 'admin-app/config/environment';

export default DS.JSONAPIAdapter.extend({
	namespace: '/test-data/posts.json?',
	buildURL(modelName, id, snapshot, requestType, query) {
		let url = this._super(...arguments);
		if (env.testing === true) {
			env.currentPostQuery = query
		}
		return url;
	}
});