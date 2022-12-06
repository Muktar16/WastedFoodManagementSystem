const mongoose = require('mongoose');
const FoodRequest = mongoose.model('foodRequest');
const Op = require('Sequelize').Op;
var helpers = require("./helpers");


module.exports.addFoodRequest = async (req, res) =>{
    var newFoodRequest = new FoodRequest({
        requestId: Date.now().toString(),
        ngoEmail: req.body.ngoEmail,
        ngoName: req.body.ngoName,
        foodName: req.body.foodName,
        quantity: req.body.quantity,
        deliveryAddress: req.body.deliveryAddress,
        supplyDate: req.body.supplyDate,
        addingDate: Date.now(),
        status:"Pending"
    });

    console.log(newFoodRequest);

    newFoodRequest.save((err, doc) => {
        if (!err){
            //helpers.addActivity();
            res.send(doc);
        }         
        else {
            return res.status(422).send(err);
        }
    });
}

module.exports.getCurrentRequests = async (req, res) =>{
    console.log(req.body);
    requests = FoodRequest.find({ngoEmail:req.body.email,status:{$ne:"Delivered"}}).sort({$natural:-1});
    //console.log(requests);
    requests.exec((req, doc) =>{
        return res.status(200).json(doc);
    })
}

module.exports.getAllPendingRequests = async (req, res) =>{
    requests = FoodRequest.find({status: "Pending"}).sort({$natural:-1});
    //console.log(requests);
    requests.exec((req, doc) =>{
        return res.status(200).json(doc);
    })
}

module.exports.removeRequest = async (req, res) =>{
    console.log(req.body);
    FoodRequest.deleteOne({ requestId: req.body.requestId}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    return res.status(200).json({status:true});
}



