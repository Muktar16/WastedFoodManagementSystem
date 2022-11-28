const mongoose = require('mongoose');
const passport = require('passport/lib');
const _ = require('lodash');
const Ngo = mongoose.model('ngoUser');
const Restaurant = mongoose.model('restUser');

module.exports.ngo_register = (req, res, next) => {
    console.log("Register module");
    console.log(req.body);

    var ngo = new Ngo();
     
    ngo.ngoName = req.body.ngoName;
    ngo.ngoEmail = req.body.ngoEmail;
    ngo.phone = req.body.phone;
    ngo.registrationNo = req.body.registrationNo;
    ngo.address = req.body.address;
    ngo.password = req.body.password;

    console.log(ngo);

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

module.exports.rest_register = (req, res, next) => {
    console.log("Register module");
    console.log(req.body);

    var restaurant = new Restaurant();
     
    restaurant.name = req.body.name;
    restaurant.email = req.body.email;
    restaurant.phone = req.body.phone;
    restaurant.address = req.body.address;
    restaurant.password = req.body.password;

    console.log(restaurant);

    restaurant.save((err, doc) => {
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
    console.log(req.body);
    let userType = req.body.userType;
    let email = req.body.email;
    let password = req.body.password;

    if(userType=="NGO Representative"){
        console.log("Ngo");
        Ngo.findOne({ ngoEmail: email },(err, user) => {
            if(user){
              if(!user.verifyPassword(password)){
                 return res.status(200).json({"status":"false", "message":"Wrong Password", token:""});
              }
              else return res.status(200).json({"status":"true", "message":"Success", "token": user.generateJwt()});
            }
            else return res.status(200).json({"status":"false","message":"Email is not registered"});
         }
     );
    }
    else if(userType=="Restaurant Representative"){
        console.log("restatrrant");
        Restaurant.findOne({ email: req.body.email },(err, user) => {
            if(user){
              if(!user.verifyPassword(password)){
                 return res.status(200).json({"status":"false", "message":"Wrong Password", token:""});
              }
              else return res.status(200).json({"status":"true", "message":"Success", "token": user.generateJwt()});
            }
            else return res.status(200).json({"status":"false","message":"Email is not registered"});
         }
     );
    }
    
    //call for passport authentication
    // passport.authenticate('local', (err, user, info) => {       
    //     // error from passport middleware
    //     if (err) return res.status(400).json(err);
    //     // registered user
    //     else if (user) return res.status(200).json({ "token": user.generateJwt()});
    //     // unknown user or wrong password
    //     else return res.status(404).json(info);
    // })(req, res);
}


// const jwt = require('jsonwebtoken');

// module.exports.verifyJwtToken = async (req, res, next) => {
//     //console.log(req.body.token);
//     var ret;    
//     jwt.verify(req.body.token, process.env.JWT_SECRET,
//             (err, decoded) => {
//                 if(err)
//                     ret = { status: false, message: 'Token authentication failed' };
//                 else{
//                     ret = decoded;
//                 }
//             }
//         )
//         User.findOne({ _id: ret._id },
//             (err, user) => {
//                 if (!user)
//                     return res.status(404).json({ status: false, message: 'User record not found.' });
//                 else
//                 {
//                     //console.log(user);
//                     return res.status(200).json({ status: true, user : _.pick(user,['userName','email']) });
//                 }
                    
//             }
//         );
//     //return res.send(ret);
// }
 

// 
