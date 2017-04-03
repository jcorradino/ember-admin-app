import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
//import env from 'admin-app/config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	queryParams: {
		page: {
			replace: true,
			refreshModel: true
		}
	},
	model(params) {
		let page = params.page || 1;
		let _ = this;
		let model = {
			data: this.get('store').query('post', {
				filter: {
					page: page,
					itemsPerPage: 20
				}
			}),
			page: page,
			pageCount: 1,
			itemsPerPage: 20
		}

		model.data.then(function(response) {
			_.set('currentModel.page', Number(response.get('meta.page')));
			_.set('currentModel.pageCount', Math.ceil(response.get('meta.total')/model.itemsPerPage));
			_.set('currentModel.isFirstPage', String(response.get('meta.page')) === String(1) ? true : false);
			_.set('currentModel.isLastPage', String(response.get('meta.page')) === String(_.get('currentModel.pageCount')) ? true : false);
			_.set('currentModel.paginationStart', (Number(_.get('currentModel.page')) - 4 < 1) ? 1 : (Number(_.get('currentModel.page')) - 4));
			_.set('currentModel.paginationEnd', (Number(_.get('currentModel.page')) + 4 > Number(_.get('currentModel.pageCount'))) ? Number(_.get('currentModel.pageCount')) : Number(_.get('currentModel.page')) + 4);
			_.set('currentModel.showStartElipsis', (Number(_.get('currentModel.paginationStart')) !== 1) ? true : false);
			_.set('currentModel.showEndElipsis', (Number(_.get('currentModel.paginationEnd')) !== Number(_.get('currentModel.pageCount'))) ? true : false);
		});

		return model;
	},
	actions: {
		changePage(param) {
			let page = Number(this.get('currentModel.page'));
			if (Number(param) === 1 || (param === "previous" && page === 2)) {
				this.transitionTo('posts', { queryParams: { page: undefined }});
			} else {
				let transitionPage = (param === "next") ? Number(page) + 1 :
					(param === "previous") ? Number(page) - 1 : param;
				this.transitionTo('posts', { queryParams: { page: transitionPage }});
			}
		}
	}
});
