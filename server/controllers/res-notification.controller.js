const { request } = require('express');
const { forEach } = require('lodash');
const mongoose = require('mongoose');
const FoodRequest = mongoose.model('foodRequest');
const FoodPackage = mongoose.model('foodPackage');
const resNotificaiton = mongoose.model('restaurantNotification');

module.exports.sendRequestNotice = async (req, res) =>{

    FoodPackage.findOne( {packageId: req.body.packageId },(err, Package) => {
            if (err){
                return res.status(422).send(err);
            }  
            else{
                FoodRequest.findOne({requestId: req.body.requestId},(err,request)=>{
                    if(!err){
                        var notificaiton = new resNotificaiton();
                        notificaiton.notificaitonId = Date.now().toString();
                        notificaiton.message = "NGO '"+request.ngoName+"' is Requesting for Your food package with Package ID: "+Package.packageId+" Food Name: "+Package.foodName+" Quantity: "+Package.quantity+" On "+request.deliveryAddress+".";
                        notificaiton.status = "running";
                        notificaiton.addingDate = Date.now();
                        notificaiton.requestId = req.body.requestId;
                        notificaiton.packageId = req.body.packageId;
                        notificaiton.restaurantEmail = Package.restaurantEmail;

                        console.log(notificaiton);

                        notificaiton.save(async (err, doc) => {
                            if (!err){
                                var rslt = await FoodPackage.updateOne(
                                    {packageId:req.body.packageId},
                                    {
                                      $set:{status:"Requested by "+request.ngoName}  
                                    }
                                )
                                
                                
                                console.log("Notificaiton Saved")
                                res.send(doc);
                            }         
                            else {
                                return res.status(422).send(err);
                            }
                        });
                    }
                    else{
                        return res.status(422).send(err);
                    }
                })
                //return res.status(200).json({ status: true,userType:'Ngo Representative', user : _.pick(user,['ngoName','ngoEmail']) });

            }
        }
    );    
}


module.exports.getAllNotificaions = async (req, res) =>{
    console.log("Notididadfs")
    let notificaitons = resNotificaiton.find({status:"running"}).sort({$natural:-1});
    notificaitons.exec((req, doc) =>{
        return res.status(200).json(doc);
    })
}

