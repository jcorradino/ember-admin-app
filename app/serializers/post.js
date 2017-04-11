import DS from "ember-data";
import env from 'admin-app/config/environment';

export default DS.JSONAPISerializer.extend({

normalizeArrayResponse() {
    const normalizedDocument = this._super(...arguments);

    if (env.testing === true && env.currentPostQuery && env.currentPostQuery.filter) {
        const filter = env.currentPostQuery.filter;
        let newPayload = {
            included: normalizedDocument.included,
            meta: normalizedDocument.meta,
            data: []
        };
        if (filter.author) {
            var dataOutput = [];
            normalizedDocument.data.forEach(function(record){
                if (String(record.relationships.author.data.id) === String(filter.author)) {
                    dataOutput.push(record);
                }
            });
            normalizedDocument.data = dataOutput;
            newPayload.meta.total = dataOutput.length;
        }
        
        newPayload.meta.page = Number(filter.page);
        newPayload.meta.itemsPerPage = filter.itemsPerPage;
        if (filter.page !== undefined && filter.itemsPerPage !== undefined) {
            let startPosition = filter.itemsPerPage * (filter.page - 1);
            let endPosition = startPosition + filter.itemsPerPage;

            endPosition = (endPosition > newPayload.meta.total) ? newPayload.meta.total : endPosition;

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