import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
	this.route('posts', function() {
		this.route('new');
	});
	this.route('media', function() {
		this.route('new');
	});
	this.route('user', function() {
		this.route('new');
	});
	this.route('taxonomy');
	this.route('collections');
	this.route('login');
});

export default Router;