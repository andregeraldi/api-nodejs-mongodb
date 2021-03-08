const mongoose = require('mongoose');
const bcrypt    = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    mail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, //atributo nao é retornado na query
    },
    created: {
        type: Date,
        defaut: Date.now
    }
});

UserSchema.pre('save', function(next) {
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted;
        return next();
    })
});

module.exports = mongoose.model('User', UserSchema);