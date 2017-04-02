import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: '/test-data/posts.json?'
});