const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
// To use our schema definition, we need to convert our UserSchema into a Model we can work with.
// Instances of Models are documents.
const User = mongoose.model('users', UserSchema);
module.exports = User;
