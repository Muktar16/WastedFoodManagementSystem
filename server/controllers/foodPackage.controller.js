const mongoose = require('mongoose');
const FoodPackage = mongoose.model('foodPackage');
const FoodRequest = mongoose.model('foodRequest');
const Op = require('Sequelize').Op;

module.exports.addFoodPackage = async (req, res) =>{    
    var newPackage = new FoodPackage({
        packageId: Date.now().toString(),
        restaurantEmail: req.body.restaurantEmail,
        restaurantName: req.body.restaurantName,
        foodName: req.body.foodName,
        quantity: req.body.quantity,
        addingDate: Date.now(),
        expiryDate: req.body.expiryDate,
        status: "Pending"
    });

    newPackage.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return res.status(422).send(err);
        }
    });
}

module.exports.getCurrentPackages = async (req, res) =>{
    packages = FoodPackage.find({restaurantEmail:req.body.email,status:{$ne:"Delivered"}}).sort({$natural:-1});;
    packages.exec((req, doc) =>{
        return res.status(200).json(doc);
    })
}

module.exports.getAllAvailablePackages = async (req, res) =>{
    packages = FoodPackage.find({status:"Pending"}).sort({$natural:-1});
    console.log(packages);
    packages.exec((req, doc) =>{
        return res.status(200).json(doc);
    })
}

//get available request similar to a foodName
module.exports.getAvailablePackages = async (req, res) =>{
    // packages = FoodPackage.find({foodName:req.body.foodName,status:"Pending",quantity:{$gte: req.body.quantity-req.body.quantity*0.10},quantity:{$lte: req.body.quantity+req.body.quantity*0.10}});
    packages = FoodPackage.find({foodName:req.body.foodName,status:"Pending"}).sort({$natural:-1});
    packages.exec((req, doc) =>{
        return res.status(200).json(doc);
    })
}

module.exports.removePackage = async (req, res) =>{
    FoodPackage.deleteOne({ packageId: req.body.packageId}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    return res.status(200).json({status:true});
}

module.exports.updatePackage = async (req, res) =>{
    console.log(req.body)

    FoodPackage.updateOne(
        {packageId:req.body.packageId},
        { $set:
            {
              foodName: req.body.foodName,
              quantity: req.body.quantity,
              expiryDate: req.body.expiryDate
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





