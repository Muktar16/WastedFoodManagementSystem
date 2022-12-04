const mongoose = require('mongoose');
const FoodItem = mongoose.model('foodItem');

module.exports.getAllFoodItems = async (req, res) =>{
    let foodItems = FoodItem.find();
    foodItems.exec((req, doc) =>{
        return res.status(200).json(doc);
    })
}

module.exports.removeFoodItem = async (req, res) =>{
    FoodItem.deleteOne({ name: req.body.name}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    return res.status(200).json({status:true});
}

module.exports.addFoodItem = async (req, res) =>{
    FoodItem.findOne({ name: req.body.name },
        (err, food) => {
            if (!food){
                //return res.status(404).json({ status: false, message: 'User record not found.' });
                var newFood = new FoodItem({
                    name: req.body.name,
                    addingDate: Date.now(),
                });
            
                let promise = newFood.save();
            
                promise.then((doc=>{
                    return res.status(201).json(doc);
                }))
            
                promise.catch((err=>{
                    return res.status(501).json(err);
                }))
            }
                
            else
                return res.status(404).json({ status: false, message: 'Food Already Exists' });
        }
    );
}