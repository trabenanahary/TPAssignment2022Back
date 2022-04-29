let Assignment = require('../model/assignment');
let Matiere = require('../model/matiere')

// noter un assignment
function putAssignmentWithNote(req, res) {
    let assignment = null;
    assignment = new Assignment(req.body);
    assignment.rendu = true;
    Assignment.findByIdAndUpdate(assignment._id, assignment, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated note'})
        }

      // console.log('updated ', assignment)
    });
}

// Ajout assignment pour chaque eleve
function postAssignmentsForEachStudent(req, res) {
    Matiere
    .findById(req.body.matiereRef)
    .exec((err, matiere) => {
        if(err){
            res.send(err)
        }
        const matiereObj = new Matiere(matiere);
        if(matiereObj.eleve.length == 0) {
            res.send({errorEmptyStudent:"aucun élève pour ce matiere"})
        } 
        let assignment = null;
        for(let i=0; i<matiereObj.eleve.length; i++) {
            assignment = new Assignment(req.body);
            assignment.eleveRef = matiereObj.eleve[i]
            assignment.save( (err) => {
                if(err){
                    res.send('cant post assignment ', err);
                }
            })
        } 
        res.json({ message: `saved!`})      
    })
}

// Recupérer tous les assignements avec ses references (eleveRef, matiereRef)
function getAssignementsComplete(req, res) {
    Assignment
    .find()
    .populate("eleveRef")
    .populate("matiereRef", "-eleve")
    .exec((err, assign) => {
        if(err){
            res.send(err)
        }

        res.send(assign);
    })
}

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    let assignment = null;
    assignment = new Assignment(req.body);
    Assignment.findByIdAndUpdate(assignment._id, assignment, {new: true}, (err, assignment) => {
        if (err) {
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { 
    getAssignments, 
    postAssignment, 
    getAssignment, 
    updateAssignment, 
    deleteAssignment, 
    getAssignementsComplete, 
    postAssignmentsForEachStudent,
    putAssignmentWithNote
};
