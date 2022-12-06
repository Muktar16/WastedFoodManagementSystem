const { default: mongoose } = require("mongoose");

const Activity = mongoose.model('activity');

exports.addActivity = function(object){
    var activity = new Activity();
    activity.activityId = Date.now.toString();
    activity.details = object.details;
    activity.activityTime = object.time;

    console.log("hello")
    activity.save();
};