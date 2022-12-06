const mongoose = require('mongoose');

var restaurantNotificationSchema = new mongoose.Schema({
    notificaitonId: {type: String,required: 'Notificaton ID missing',unique:true},
    requestId: {type: String, required: 'requestId can\'t be empty'},
    packageId: {type: String, required: 'Package ID can\'t be empty'},
    packageId: {type: String, required: 'Package ID can\'t be empty'},
    restaurantEmail: {type: String, required: 'email can\'t be empty'},
    status: {type: String, required: 'status can\'t be empty'},
    addingDate: {type: Date,unique:true},
});

mongoose.model('restaurantNotification', restaurantNotificationSchema);