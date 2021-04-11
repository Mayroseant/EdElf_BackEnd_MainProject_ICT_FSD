//Accessing Mongoose package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.44eib.mongodb.net/EDELF?retryWrites=true&w=majority');

//Schema definition
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Role: String,
    Name: String,
    Password: String,
    Organisation: String,
    location: String,
    email: String,
    phone: Number
});

//Model creation
var User = mongoose.model('user', UserSchema);

module.exports = User;