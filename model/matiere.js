let mongoose = require('mongoose');
const users = require('./users');
let Schema = mongoose.Schema;

let MatieresSchema = Schema({
    nom: String,
    picture: String,
    prof: {type: Schema.Types.ObjectId, ref: users},
    eleve: [{type: Schema.Types.ObjectId, ref: users}]

});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Matieres', MatieresSchema);
