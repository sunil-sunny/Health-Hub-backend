/* @author Swarali Ghalwadkar <swarali.ghalwadkar@dal.ca> */

const Feedback = require('../models/Feedback');


exports.getfeedback = (req, res, next) => {
    Feedback.find((err, docs) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(docs)
            console.log('error in retrieving feedback' + JSON.stringify(err, undefined, 2));
        }
    });
}

exports.getbyid = (req, res, next) => {
    if (!req.params.id)
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Feedback.findById(req.params.id, (err, doc) => {

        if (!err) {
            res.send(doc);
        }
        else {
            console.log('error in adding feedback' + JSON.stringify(err, undefined, 2));
        }

    });
}

exports.postfeedback = (req, res, next) => {
    var emp = new Feedback({
        name: req.body.name,
        date: req.body.date,
        feedback: req.body.feedback

    });
    console.log(emp);
    emp.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                feedback: emp
            })
        })
        .catch(err => {
            return res.status(200).json({
                success: false,
                error: err
            })
        })
    // emp.save((err,doc) => {
    //     if(!err){
    //         console.log("in save")
    //         res.send(doc);
    //     }
    //     else{
    //         console.log('error in adding feedback' + JSON.stringify(err,undefined,2));
    //     }
    // });
    // emp.save().then(result=>{
    //     res.send(result)
    // }).catch(err=>{
    //     throw err;
    // })
}

exports.putfeedback = (req, res, next) => {
    if (!req.params.id)
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    var emp = new Feedback({
        name: req.body.name,
        date: req.body.date,
        feedback: req.body.feedback

    });

    Feedback.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('error in adding employees' + JSON.stringify(err, undefined, 2));
        }
    });
}