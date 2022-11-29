const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/WastedFoodManagementDB', (err) => {
    if (!err) { console.log('connected to mongodb://localhost:27017/WastedFoodManagementDB'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./ngo_user.model');
require('./rest_user.model');
require('./admin.model');
