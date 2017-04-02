import DS from "ember-data";
import env from 'admin-app/config/environment';

export default DS.JSONAPISerializer.extend({

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const normalizedDocument = this._super(...arguments);

    if (env.testing === true && env.currentPostQuery && env.currentPostQuery.filter) {
        const filter = env.currentPostQuery.filter;
    	let newPayload = {
    		included: normalizedDocument.included,
            meta: normalizedDocument.meta,
    		data: []
    	};
        newPayload.meta.page = filter.page - 1;
        newPayload.meta.itemsPerPage = filter.itemsPerPage;
    	if (filter.page !== undefined && filter.itemsPerPage !== undefined) {
    		let startPosition = filter.itemsPerPage * filter.page;
    		let endPosition = startPosition + filter.itemsPerPage;
    		for (let i = startPosition; i < endPosition; i++) {
    			newPayload.data.push(normalizedDocument.data[i]);
    		}
    	}
    	return newPayload;
    }

    return normalizedDocument;
  },

  // extractRelationship(relationshipHash) {
  //   const normalizedRelationship = this._super(...arguments);

  //   return normalizedRelationship;
  // }

});