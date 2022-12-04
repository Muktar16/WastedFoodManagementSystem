const mongoose = require('mongoose');

var foodItemSchema = new mongoose.Schema({
    name: {type: String, required: 'Name Field can\'t be empty',unique: true},
    addingDate: {type: Date}
});

mongoose.model('foodItem', foodItemSchema);