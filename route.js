const express = require('express');
const router = express.Router();

router.post('/summary/score', (req,res) => {
    console.log(req.body)

    // res.render('leaderboard')
})

module.exports = router;