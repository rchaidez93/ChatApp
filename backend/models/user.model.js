const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    admin: {
        type: Boolean,
        required: true
    },
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
    public_channels: [{
        id: mongoose.Types.ObjectId,
        name: String
    }],
    direct_channels: [{
        id: mongoose.Types.ObjectId,
        name: String
    }]
});

userSchema.methods.comparePassword = function(candidatePassword){
    return candidatePassword.localeCompare(this.password);   
}

const User = mongoose.model('User', userSchema);

module.exports = User;