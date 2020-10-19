const router  = require('express').Router();
let User = require('../models/user.model');

router.post('/authenticate', (req,res) => {   
    const username = req.body.username;
    const password = req.body.password;

    let isAuthenticated = false;
    const select = {
        public_channels: 1,
        direct_channels: 1,
        workspace_id: 1,
        user_id: 1,
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
                    user_id: user.user_id,
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
router.post('/', (req,res) => {
    const newUser = [{
        "workspace_id": 2,
        "user_id": 1,
        "admin": true,
        "username": "richi",
        "password": "password",
        "fname": "Rich",
        "lname": "Chaidez",
        "public_channels": [],
        "direct_channels": []
    }];
    User.insertMany(newUser, (err, user) => {
        if(err) throw err;
        console.log(user);
        res.json({
            "success": true
        });
    })
})

//delete user
router.delete('/')

//get user channels
router.get('/channels', (req, res) => {
    const result = User.findOne({username: req.body.username}, {public_channels: 1,direct_channels: 1}, (err, user) => {
        if(err) throw err;

        res.json({
            "public": user.public_channels,
            "direct": user.direct_channels
        })
        console.log(result);
    });
});

//add user channels
router.post('/channels', (req, res) => {
    let success;
    try{
        User.updateOne(
            { username: req.body.username},
            { $push: 
                { 
                    public_channels: req.body.public, 
                    direct_channels: req.body.direct
                }
            }, (err, user) => {
                if(err) throw err;
                if(user.ok){
                    res.json({"success": true});
                    success = true;
                }
        });
    }catch(e) {
        console.error(e);
    }
});

//delete user channels
router.delete('/channels', (req, res) => {

});

module.exports = router;