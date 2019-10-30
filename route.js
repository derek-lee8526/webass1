const express = require('express');
const userModel = require('./models/gameData')
const router = express.Router();

router.get('/summary/leaderboard', (req,res) => {
    res.render('leaderboard')
})


router.post('/summary/score', (req,res) => {
    let user = req.body.user
    let userScore = req.body.userScore

    userScore = {
        name: user,
        score: userScore
    }

    userModel.add(userScore);
    res.redirect(301,'/summary/leaderboard')
})


module.exports = router;