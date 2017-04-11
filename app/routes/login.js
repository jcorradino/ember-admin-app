import Ember from 'ember';
import env from 'admin-app/config/environment';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
	session: Ember.inject.service('session'),
	authenticator: 'authenticator:custom',
	model() {
		let obj = {}
		obj.isTesting = (env.testing === true) ? true : false;
		return obj;
	},

	actions: {
		testLogin(role) {
			var credentials;
			if (String(role) === "1") {
				credentials = {username:"AJaynes", password:"12345", role:role, userId: 2};
			} else {
				credentials = {username:"JSmith", password:"12345", role:role, userId: 6};
			}
            this.get('session').authenticate('authenticator:custom', credentials).catch((message) => {
                this.set('errorMessage', message);
            });
		}
	}
});