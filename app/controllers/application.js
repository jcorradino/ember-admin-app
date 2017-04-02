import Ember from "ember";
export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	navigation: Ember.computed("session.isAuthenticated", function(){
		let logText = (this.get('session.isAuthenticated') === false) ? "Log In" : "Log Out";
		let logIcon = (this.get('session.isAuthenticated') === false) ? "in" : "out";
		let logAction = (this.get('session.isAuthenticated') === false) ? false : "invalidateSession";
		return {
			"left": [
				{
					"name": "Posts",
					"route": "posts",
					"icon": "th-list",
					"permission": 1
				},
				{
					"name": "Media",
					"route": "media",
					"icon": "picture",
					"permission": 1
				},
				{
					"name": "Taxonomy",
					"route": "taxonomy",
					"icon": "tag",
					"permission": 2
				},
				{
					"name": "Collections",
					"route": "collections",
					"icon": "modal-window",
					"permission": 2
				},
			],
			"right": [
				{
					"name": "New Post",
					"route": "posts.new",
					"icon": "plus",
					"permission": 1
				},
				{
					"name": "Upload Media",
					"route": "media.new",
					"icon": "download-alt",
					"permission": 1
				},
				{
					"name": "Users",
					"icon": "user",
					"permission": 3,
					"dropdown": [
						{
							"name": "New User",
							"route": "user.new",
							"permission": 3
						}, 
						{
							"name": "User List",
							"route": "user",
							"permission": 3
						}, 
					]
				},
				{
					"seperator": "true"
				},
				{
					"name": logText,
					"route": "login",
					"icon": "log-" + logIcon,
					"action": logAction,
					"permission": 0
				},
			]
		}
	})
});
