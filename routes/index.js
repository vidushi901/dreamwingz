var express= require('express');
var router= express.Router();
var jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');


router.get('/',function(req,res,next)
{    
        res.render('index')           
})





module.exports=router;