const mongoose = require('mongoose');
const Admin = mongoose.model('admin');
const Activity = mongoose.model('activity')

module.exports.authenticate = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email);
    console.log(password);

    if(!email || !password){
      return res.status(200).json({"status":"false", "message":"Email or Password Missing"});
    }
    Admin.findOne({ email: email },(err, user) => {
        if(user){
          console.log(user);
          if(!user.verifyPassword(password)){
             return res.status(200).json({"status":"false", "message":"Wrong Password"});
          }
          else return res.status(200).json({"status":"true", "token": user.generateJwt()});
        }
        else return res.status(200).json({"status":"false","message":"This is not an Admin email"});
     }
    );
}

module.exports.getAllActivities = (req, res, next) => {
  var activities = Activity.find();
    activities.exec((req, doc) =>{
        return res.status(200).json(doc);
    })
}