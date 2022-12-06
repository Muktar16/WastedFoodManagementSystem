const mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
    activityId: {type: String,required: 'activityID missing',unique:true},
    details: {type: String, required: 'Details can\'t be empty'},
    activityTime: {type: Date,unique:true},
});

mongoose.model('activity', activitySchema);