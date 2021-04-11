//Accessing Mongoose package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.44eib.mongodb.net/EDELF?retryWrites=true&w=majority');

//Schema definition
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    itemTitle: String,
    itemAbstract: String,
    itemContent : String,
    comments_author : String,
    comments_editor : String,
    comments_reviewer : String
});

//Model creation
var Item = mongoose.model('item', ItemSchema);

module.exports = Item;