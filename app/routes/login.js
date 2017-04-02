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
            var credentials = {username:"jsmith", password:"12345", role:role};
            this.get('session').authenticate('authenticator:custom', credentials).catch((message) => {
                this.set('errorMessage', message);
            });
		}
	}
});