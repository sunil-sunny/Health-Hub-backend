
const Writeblog = require('../models/Writeblog');


exports.getwriteblog = (req, res, next) => {
    Writeblog.find((err, docs) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(docs)
            console.log('error in retrieving blog' + JSON.stringify(err, undefined, 2));
        }
    });
}

exports.getbyid = (req, res, next) => {
    if (!req.params.id)
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Writeblog.findById(req.params.id, (err, doc) => {

        if (!err) {
            res.send(doc);
        }
        else {
            console.log('error in adding feedback' + JSON.stringify(err, undefined, 2));
        }

    });
}

exports.postwriteblog = (req, res, next) => {
    var emp = new Writeblog({
        name:req.body.name,
        title: req.body.title,
        introduction: req.body.introduction,
        content: req.body.content

    });
    console.log(emp);
    emp.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                writeblog: emp
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

exports.putwriteblog = (req, res, next) => {
    if (!req.params.id)
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    var emp = new Writeblog({
        name:req.body.name,
        title: req.body.title,
        introduction: req.body.introduction,
        content: req.body.content

    });

    writeblog.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('error in adding a blog' + JSON.stringify(err, undefined, 2));
        }
    });
}