const mongoose = require('mongoose');

var foodRequestSchema = new mongoose.Schema({
    requestId: {type: String,required: 'packageID missing',unique:true},
    ngoEmail: {type: String, required: 'Email can\'t be empty'},
    ngoName: {type: String},
    foodName: {type: String, required: 'Name Field can\'t be empty'},
    quantity: {type: Number, required: 'Quantity can\'t be empty'},
    addingDate: {type: Date,unique:true},
    deliveryAddress: {type: String, required: 'Please provide a delivery address'},
    supplyDate: {type: Date,required:'Please provide a supply date'},
    status: {type: String}
});

mongoose.model('foodRequest', foodRequestSchema);
