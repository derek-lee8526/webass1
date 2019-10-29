const express = require('express');
const router = express.Router();

router.post('/summary/score', (req,res) => {
    res.render('leaderboard')
})

module.exports = router;