const router  = require('express').Router();
let User = require('../models/user.model');

router.post('/authenticate', (req,res) => {   
    const username = req.body.username;
    const password = req.body.password;

    let isAuthenticated = false;
    User.findOne({username:username}, (err, user) => {
        if(err) throw err;

        const passwordMatch = user.comparePassword(password);

        if(passwordMatch === 0){
            isAuthenticated = true;
            res.json({authenticated: isAuthenticated});
        }else{
            isAuthenticated = false;
            res.json({authenticated: isAuthenticated});
        }
    });
});

router.get('/channels', (req, res) => {
    User.findOne({username: req.body.username}, {public_channels: 1,direct_channels: 1}, (err, user) => {
        if(err) throw err;

        res.json({
            "public": user.public_channels,
            "direct": user.direct_channels
        })

    });
});

module.exports = router;