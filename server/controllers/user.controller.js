const mongoose = require('mongoose');
const passport = require('passport/lib');
const _ = require('lodash');
const Ngo = mongoose.model('ngoUser');
const Restaurant = mongoose.model('restUser');
const jwt = require('jsonwebtoken');

// module.exports.authenticate = (req, res, next) => {
//     let userType = req.body.userType;
//     let email = req.body.email;
//     let password = req.body.password;

//     if(userType=="NGO Representative"){
//         Ngo.findOne({ ngoEmail: email },(err, user) => {
//             if(user){
//               if(!user.verifyPassword(password)){
//                  return res.status(200).json({"status":"false", "message":"Wrong Password", token:""});
//               }
//               else return res.status(200).json({"status":"true", "userType":"NGO Representative", "token": user.generateJwt()});
//             }
//             else return res.status(200).json({"status":"false","message":"Email is not registered"});
//          }
//         );
//     }
//     else if(userType=="Restaurant Representative"){
//         Restaurant.findOne({ email: req.body.email },(err, user) => {
//             if(user){
//               if(!user.verifyPassword(password)){
//                  return res.status(200).json({"status":"false", "message":"Wrong Password", token:""});
//               }
//               else return res.status(200).json({"status":"true", "userType":"Restaurant Representative", "token": user.generateJwt()});
//             }
//             else return res.status(200).json({"status":"false","message":"Email is not registered"});
//          }
//      );
//     }
    
// }

module.exports.userProfile = async (req, res) =>{

    var token;
    if ('authorization' in req.headers) token = req.headers['authorization'].split(' ')[1];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    {
                        console.log(err)
                        return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                    }
                else {
                    req._id = decoded._id;
                    Ngo.findOne({ _id: req._id },
                        (err, user) => {
                            if (!user){
                                //return res.status(404).json({ status: false, message: 'User record not found.' });
                                Restaurant.findOne({ _id: req._id },
                                    (err, user) => {
                                        if (!user){
                                            return res.status(404).json({ status: false, message: 'User record not found.' });
                                            
                                        }
                                            
                                        else
                                            return res.status(200).json({ status: true,userType:'Restaurant Representative', user : _.pick(user,['name','email']) });
                                    }
                                );
                            }
                                
                            else
                                return res.status(200).json({ status: true,userType:'Ngo Representative', user : _.pick(user,['ngoName','ngoEmail']) });
                        }
                    );
                }
            }
        )
    }
}

module.exports.recoverPassword = async (req, res) =>{
    console.log("Request Redeived");
    console.log(req.body);
    return res.status(200).json({status:true});
}



