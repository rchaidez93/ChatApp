const router  = require('express').Router();
const { deleteOne } = require('../models/user.model');
let User = require('../models/user.model');

router.post('/authenticate', (req,res) => {   
    const username = req.body.username;
    const password = req.body.password;

    let isAuthenticated = false;
    const select = {
        public_channels: 1,
        direct_channels: 1,
        workspace_id: 1,
        admin: 1,
        username: 1,
        password: 1
    }
    User.findOne({username:username}, select, (err, user) => {
        if(err) throw err;

        const passwordMatch = user.comparePassword(password);

        if(passwordMatch === 0){
            isAuthenticated = true;
            res.json({
                authenticated: isAuthenticated,
                user: {
                    public_channels: user.public_channels,
                    direct_channels: user.direct_channels,
                    workspace_id: user.workspace_id,
                    user_id: user._id,
                    admin: user.admin,
                    username: user.username,
                }
            });
        }else{
            isAuthenticated = false;
            res.json({authenticated: isAuthenticated});
        }
    });
});

//add user
router.post('/add_user', (req,res) => {
    //check if username is unique
    const username = req.body.username;
    const newUser = [{
        "workspace_id": req.body.workspace_id,
        "admin": true,
        "username": req.body.username,
        "password": "password",
        "fname": "",
        "lname": "",
        "public_channels": [{
            name: "Public"
        }],
        "direct_channels": []
    }];
    User.insertMany(newUser, (err, user) => {
        if(err) throw err;
        console.log(user);
        res.json({
            success: true
        });
    })
})

//delete user
router.delete('/delete_user', (req,res) => {
    User.findByIdAndDelete(req.body.userID, (err, user) => {
        if(err){
            res.json({success: false, message: "User not deleted successfully."})
        } else {
            res.json({success:true, message: "User deleted successfully."})
        }
    })
})

//add user channels
router.post('/add_user_channel', (req, res) => {
    let channel;

    //make sure channel isn't already created
    const channelName = req.body.name;
    const userID = req.body.userID;

    if(req.body.type==="public"){
        channel = { 
            public_channels: {name: channelName }
        }
    } else{
        channel = { 
            direct_channels: {name: channelName }
        }
    }

    User.findByIdAndUpdate(
        userID,
        { $push: channel },
        (err, user) => {
            if(err) {
                res.json({success: false, message: "Channel not added successfully."});
            } else{
                res.json({success: true, message: "Channel added successfully."});
            }            
    });

});

//delete user channels
// TODO: remvoe all messages that belong to that channel
router.delete('/delete_user_channel', (req, res) => {
    const userId = req.body.userID;
    const channelType = req.body.channelType;
    const channelID = req.body.channelID;
    let pull;

    if(channelType === 'public') {
        pull = { public_channels: {_id: channelID} };
    } else {
        pull = { direct_channels: {_id: channelID} };
    }

    User.findByIdAndUpdate(
        userId,
        { $pull: pull},
        (err, updatedChannels) => {
            if(err) {
                res.json({success: false, message: err});
            } else {
                res.json({success: true, message: "Channel removed successfully."})
            }
        })

});

module.exports = router;