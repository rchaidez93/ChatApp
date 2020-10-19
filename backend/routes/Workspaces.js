const router  = require('express').Router();
let workspaces = require('../models/workspaces.model');

router.get('/', (req, res) => {
   
    workspaces.find({}, (err, workspace) => {
        if(err) throw err;

        res.json({success: true, workspaceInfo: workspace});
    });
    
});

module.exports = router;