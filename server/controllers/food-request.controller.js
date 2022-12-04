const mongoose = require('mongoose');
const FoodRequest = mongoose.model('foodRequest');


module.exports.addFoodRequest = async (req, res) =>{
    var newFoodRequest = new FoodRequest({
        foodName: req.body.foodName,
        amount: req.body.amount,
        deliveryAddress: req.body.deliveryAddress,
        supplyDate: req.body.supplyDate
    });
    let promise = newFoodRequest.save();
    promise.then((doc=>{
        return res.status(201).json(doc);
    }))

    promise.catch((err=>{
        return res.status(501).json(err);
    }))
}
