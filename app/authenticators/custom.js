import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
export default Base.extend({
    tokenEndpoint: '/',
    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            // if (!Ember.isEmpty(data.token)) {
                resolve(data);
            // } else {
            //     reject();
            // }
        });
    },

    authenticate: function(options) {
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                url: this.tokenEndpoint,
                // type: 'POST',
                // data: JSON.stringify({
                //     username: options.identification,
                //     password: options.password
                // }),
                // contentType: 'application/json;charset=utf-8',
                // dataType: 'json'
            }).then(function(response) {
            	console.log(true)
                Ember.run(function() {
                    resolve({
                        token: "abcdefg1234567",
                        userName: "John Smith",
                        permissionLevel: options.role
                    });
                });
            }, function(xhr, status, error) {
            	console.log(false);
                Ember.run(function() {
                    reject();
                });
            });
        });
    },

    invalidate: function() {
        console.log('invalidate...');
        return Ember.RSVP.resolve();
    }
});