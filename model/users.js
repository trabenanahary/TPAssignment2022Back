let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UsersSchema = Schema({
    nom: String,
    type: String,
    password: String,
    photo: String

});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Users', UsersSchema);
