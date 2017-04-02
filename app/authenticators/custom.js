import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
export default Base.extend({
    tokenEndpoint: '/',
    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve) {//, reject) {
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
            }).then(function() {//response) {
                Ember.run(function() {
                    resolve({
                        token: "abcdefg1234567",
                        userName: "John Smith",
                        permissionLevel: options.role
                    });
                });
            }, function() {
                Ember.run(function() {
                    reject();
                });
            });
        });
    },

    invalidate: function() {
        return Ember.RSVP.resolve();
    }
});