const mongoose = require('mongoose');
const FoodRequest = mongoose.model('foodRequest');
const Op = require('Sequelize').Op;
var helpers = require("./helpers");
const ngoNotificaiton = mongoose.model('ngoNotification');
const resNotificaiton = mongoose.model('restaurantNotification');


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


module.exports.changeStatus = async (req, res) =>{
    FoodRequest.updateOne(
        {requestId:req.body.requestId},
        { $set:
            {
              status: "Delivered",
            }
         },
        async function (err, docs) {
        if (err){
            console.log(err)
            return res.status(422).json(err);
        }
        else{
            var rslt = await ngoNotificaiton.updateOne(
                {notificaitonId:req.body.notificaitonId},
                {
                  $set:{status:"Delivered"}  
                }
            )
            resNotificaiton.findOne( {requestId: req.body.requestId,packageId: req.body.packageId },async (err, notificaiton) => {
                if (err){
                    return res.status(422).send(err);
                }  
                else{
                    var rslt = await resNotificaiton.updateOne(
                        {notificaitonId:notificaiton.notificaitonId},
                        {
                          $set:{status:"Delivered"}  
                        }
                    )
                }
        })
            
            console.log("Updated Docs : ", docs);
            return res.status(200).json(docs)
        }
    });
}


module.exports.updateRequest = async (req, res) =>{
    console.log(req.body)

    FoodRequest.updateOne(
        {requestId:req.body.requestId},
        { $set:
            {
              foodName: req.body.foodName,
              quantity: req.body.quantity,
              deliveryAddress: req.body.deliveryAddress,
              supplyDate:req.body.supplyDate
            }
         },
        function (err, docs) {
        if (err){
            console.log(err)
            return res.status(422).json(err);
        }
        else{
            
            console.log("Updated Docs : ", docs);
            return res.status(200).json(docs)
        }
    });
     
}



