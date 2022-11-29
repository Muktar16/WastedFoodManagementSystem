const mongoose = require('mongoose');
const Admin = mongoose.model('admin');

module.exports.authenticate = (req, res, next) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;

    Admin.findOne({ email: email },(err, user) => {
        if(user){
          if(!user.verifyPassword(password)){
             return res.status(200).json({"status":"false", "message":"Wrong Password", token:""});
          }
          else return res.status(200).json({"status":"true", "token": user.generateJwt()});
        }
        else return res.status(200).json({"status":"false","message":"This is not an Admin email"});
     }
    );
}