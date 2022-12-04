const mongoose = require('mongoose');

var foodRequestSchema = new mongoose.Schema({
    foodName: {type: String, required: 'Name Field can\'t be empty',unique:true},
    amount: {type: Number, required: 'amount can\'t be empty',unique:true},
    deliveryAddress: {type: String, required: 'please provide a delivery address',unique:true},
    supplyDate: {type: Date,required:'Please provide a supply date',unique:true}
});

mongoose.model('foodRequest', foodRequestSchema);