const router  = require('express').Router();
let User = require('../models/user.model');

router.route('/authenticate').post((req,res) => {
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
})

module.exports = router;