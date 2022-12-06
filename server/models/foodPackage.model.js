const mongoose = require('mongoose');

var foodPackageSchema = new mongoose.Schema({
    packageId: {type: String,required: 'packageID missing',unique:true},
    restaurantEmail: {type: String, required: 'Email can\'t be empty'},
    restaurantName: {type: String, required: 'Email can\'t be empty'},
    foodName: {type: String, required: 'Name Field can\'t be empty'},
    quantity: {type: Number, required: 'Quantity can\'t be empty'},
    addingDate: {type: Date,unique:true},
    expiryDate: {type: Date,required:'Please provide a supply date'},
    status: {type: String}
});

mongoose.model('foodPackage', foodPackageSchema);