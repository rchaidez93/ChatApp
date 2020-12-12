const router  = require('express').Router();
const e = require('express');
let Message = require('../models/messages.model');

//add Messages
router.post("/add_message", (req,res)=> {
    const channelID = req.body.channelId;
    const message = req.body.text;

    if(message.length < 1){
        res.end();
    };
    if(channelID===null || typeof channelID === 'undefined'){
        res.status(302).json({success: false, message: "Channel id is missing"});
    }

    Message.insertMany(req.body, (err, msg)=> {
        if(err){
            res.json({success: false, message: err});
        }else{
            res.json({messaage: "saved success", success: true});
        }
    });
});


//read messages from channel
router.get("/get_messages", (req,res) => {
    const channelID = req.body.channel;
    Message.find({channelID: channelID}, {id:1,channelId:1,text:1,user:1, createdAt:1}, (err, messages) => {
        if(err){
            res.status(500).json({success: false, message: "Something went wrong."});
        }
        res.status(200).json(messages);
    });
});

module.exports = router;