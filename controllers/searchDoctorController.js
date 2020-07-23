const Doctors = require('../models/Doctors');

module.exports = () => {
    exports.getDoctors = (req, res) => {
        
        const {keyword, searchfield} = req.body;
        
        if(searchfield == "name"){
            resulr = Doctors.find({name: new RegExp(keyword, 'i'), type: "doctor"}, function(err, result){
                if (err) throw err;
                res.json(result);
            });
        }
        else{
            resulr = Doctors.find({specialization: new RegExp(keyword, 'i'), type: "doctor"}, function(err, result){
                if (err) throw err;
                res.json(result);
            });
        }
    }

    return exports;
    
}