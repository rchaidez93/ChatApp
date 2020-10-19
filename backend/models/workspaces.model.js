const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workspacesSchema = new Schema({
    public_channels: {
        type: Array,
        trim: true
    },
    direct_channels: {
        type: Array,
        trim: true
    },
    users:{
        user_id: {
            admin: Boolean,
            direct_channels: Array,
            fname: String,
            lname: String,
            password: String,
            public_channels: Array,
            username: String
        }
    }
});

const Workspaces = mongoose.model('Workspaces', workspacesSchema);

module.exports = Workspaces;