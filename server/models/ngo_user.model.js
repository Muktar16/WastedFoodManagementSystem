const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var ngoSchema = new mongoose.Schema({
    ngoName: {type: String, required: 'Name Field can\'t be empty',},
    ngoEmail: {type: String, required: 'Email can\'t be empty', unique: true},
    phone: {type: String, required: 'You must provide a phone number',},
    registrationNo: {type:String,required: 'You must provide your registration Number'},
    address: {type: String, required: 'Please provide your NGO adress',},
    password: {type: String, required: 'Password can\'t be empty', minlength: [4, 'Password must be atleast 4 character long']},
    saltSecret: String
});

// Custom validation for email
ngoSchema.path('ngoEmail').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
ngoSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
ngoSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

ngoSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('User', ngoSchema);