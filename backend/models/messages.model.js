const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    channelId: String,
    text: {type: String, trim: true},
    user: Object
},{timestamps:true});

const Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages;