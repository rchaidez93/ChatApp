const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    fname:{
        type: String,
        trim: true,
    },
    lname:{
        type: String,
        trim: true,
    },
    public_channels: {
        type: Array
    },
    direct_channels: {
        type: Array
    }
});

userSchema.methods.comparePassword = function(candidatePassword){
    return candidatePassword.localeCompare(this.password);   
}

const User = mongoose.model('User', userSchema);

module.exports = User;