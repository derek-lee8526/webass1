const express = require('express');
const userModel = require('./models/gameData')
const router = express.Router();


router.post('/summary/score', (req,res) => {
    let user = req.body.user
    let userScore = req.body.userScore
    
    userScore = {
        name: user,
        score: userScore
    }
    
    userModel.add(userScore);
    res.redirect(301,'leaderboard')
})



router.get('/leaderboard/score', (req,res) => {
    let users = userModel.get()
    users.then(([Data,Metadata]) => {
        res.send(Data)
    })
})
module.exports = router;