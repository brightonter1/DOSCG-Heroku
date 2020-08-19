const express = require('express')
const router = express.Router()
const myDOSCG = require('../controller/DOSCG')
require('dotenv').config({ path: './config/.env' })

/*
    Import line api then config AccessToken 
*/


/*

    Function : Show map find best way to go between Central World and SCG Bangsue with Google API from assignment 4

*/
router.get('/location', function (req, res, next) {
    res.json(myDOSCG.location)
})


/*

    Function : Find values from sequence from assignment 2

*/

router.get('/sequence', function (req, res) {
    res.send("sequence page")
})

router.post('/sequence', function (req, res, next) {
    res.json({ result: myDOSCG.findSequence("x,y,5,9,15,23,z") })
})

/*

    Function : Find values from equation from assignment 3

*/

router.post('/equation', function (req, res, next) {
    var result = ""
    myDOSCG.findEquation(21, 0, 23, function (data) {
        result = "B : " + data
    })
    myDOSCG.findEquation(21, 0, -21, function (data) {
        result = result + ", C : " + data
    })
    res.json({ result: result })
})

/*

    Import @Line libs & config access 

*/
const line = require('@line/bot-sdk')
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};



module.exports = router;


