const mongoose = require('mongoose');
const Restaurant = mongoose.model('restUser');

module.exports.restRegister = (req, res, next) => {
    var restaurant = new Restaurant();
    restaurant.name = req.body.name;
    restaurant.email = req.body.email;
    restaurant.phone = req.body.phone;
    restaurant.address = req.body.address;
    restaurant.password = req.body.password;

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
    let userType = req.body.userType;
    let email = req.body.email;
    let password = req.body.password;

    Restaurant.findOne({ email: req.body.email },(err, user) => {
        if(user){
          if(!user.verifyPassword(password)){
             return res.status(200).json({"status":"false", "message":"Wrong Password", token:""});
          }
          else return res.status(200).json({"status":"true", "userType":"Restaurant Representative", "token": user.generateJwt()});
        }
        else return res.status(200).json({"status":"false","message":"Email is not registered"});
     }
 );
}

module.exports.getAllRestaurants = async (req, res) =>{
    let restaurants = Restaurant.find();
    restaurants.exec((req, doc) =>{
        return res.status(200).json(doc);
    })
}


module.exports.removeRestaurant = async (req, res) =>{
    Restaurant.deleteOne({ _id: req.body._id}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    return res.status(200).json({status:true});
}