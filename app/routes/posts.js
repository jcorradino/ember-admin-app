import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import env from 'admin-app/config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model() {
		let _ = this;
		let model = {
			data: this.get('store').query('post', {
				filter: {
					page: 1,
					itemsPerPage: 20
				}
			}),
			page: this.get('page'),
			pageCount: 1,
			itemsPerPage: 20
		}

		model.data.then(function(response) {
			_.set('currentModel.page', response.get('meta.page') + 1);
			_.set('currentModel.pageCount', Math.ceil(response.get('meta.total')/model.itemsPerPage));
		});

		return model;
	},
	actions: {
		changePage(page) {
			let _ = this;
			this.set('page', page);
			this.get('store').query('post', {
				filter: {
					page: page,
					itemsPerPage: 20
				}
			}).then(function(result) {
				_.set('model', result);
			});
		}
	}
});
