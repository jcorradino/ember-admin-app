import DS from "ember-data";

export default DS.JSONAPISerializer.extend({

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let normalizedDocument = this._super(...arguments);

    // console.log(payload);

    return normalizedDocument;
  },

  extractRelationship(relationshipHash) {
    let normalizedRelationship = this._super(...arguments);

    return normalizedRelationship;
  }

});