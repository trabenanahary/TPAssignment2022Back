let mongoose = require('mongoose');
const matiere = require('./matiere');
const users = require('./users');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = Schema({
    dateDeRendu: Date,
    titre: String,
    rendu: {
        type: Boolean, 
        default: false
    },
    note: {
      type: Number,
      default: -1
    },
    remarques:String,
    eleveRef: {type: Schema.Types.ObjectId, ref: users},
    matiereRef: {type: Schema.Types.ObjectId, ref: matiere},
});
// Pour ajouter la pagination
AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
