const mongoose = require('mongoose');
const NgoUser = mongoose.model('ngoUser');

module.exports.ngoRegister = (req, res, next) => {
    var ngo = new NgoUser();
    ngo.ngoName = req.body.ngoName;
    ngo.ngoEmail = req.body.ngoEmail;
    ngo.phone = req.body.phone;
    ngo.registrationNo = req.body.registrationNo;
    ngo.address = req.body.address;
    ngo.password = req.body.password;

    ngo.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Email address already used!!!!']);
            else
                return next(err);
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    let userType = req.body.userType;
    let email = req.body.email;
    let password = req.body.password;

    NgoUser.findOne({ ngoEmail: email },(err, user) => {
        if(user){
            if(!user.verifyPassword(password)){
                return res.status(200).json({"status":"false", "message":"Wrong Password", token:""});
            }
            else return res.status(200).json({"status":"true", "userType":"NGO Representative", "token": user.generateJwt()});
        }
        else return res.status(200).json({"status":"false","message":"Email is not registered"});
        }
    );
}

module.exports.getAllNgos = async (req, res) =>{
    let ngos = NgoUser.find();
    ngos.exec((req, doc) =>{
        return res.status(200).json(doc);
    })
}


module.exports.removeNgo = async (req, res) =>{
    NgoUser.deleteOne({ _id: req.body._id}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    return res.status(200).json({status:true});
}


