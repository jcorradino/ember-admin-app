import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	navigation: Ember.computed("session.isAuthenticated", function(){
		return Ember.getOwner(this).lookup("controller:application").get('navigation');
	}),
	userPermissionLevel: Ember.computed("session.isAuthenticated", function(){
		if (this.get('session.isAuthenticated') === false) {
			return 1;
		} else {
			return Number(this.get('session.data.authenticated.permissionLevel'))+1;
		}
	}),
	userName: Ember.computed("session.isAuthenticated", function(){
		if (this.get('session.isAuthenticated') === false) {
			return false;
		} else {
			return this.get('session.data.authenticated.userName');
		}
	}),
	actions: {
        invalidateSession: function() {
            this.get('session').invalidate();
        }
    }
});
