let Matiere = require('../model/matiere');

function getMatieresComplete(req, res) {
    Matiere
    .find()
    .populate("prof")
    .populate("eleve")
    .exec((err, matiere) => {
        if(err){
            res.send(err)
        }

        res.send(matiere);
    })
}

module.exports = { getMatieresComplete };