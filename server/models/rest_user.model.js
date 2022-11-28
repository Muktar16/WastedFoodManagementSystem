const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var restSchema = new mongoose.Schema({
    name: {type: String, required: 'Name Field can\'t be empty',},
    email: {type: String, required: 'Email can\'t be empty', unique: true},
    phone: {type: String, required: 'You must provide a phone number',},
    address: {type: String, required: 'Please provide your NGO address',},
    password: {type: String, required: 'Password can\'t be empty', minlength: [4, 'Password must be atleast 4 character long']},
    saltSecret: String
});

// Custom validation for email
restSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
restSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
restSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

restSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('restUser', restSchema);