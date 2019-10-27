const express = require('express');
const router = express.Router();


router.get('/terminate', (req,res) => {
    res.render('summary')
})



module.exports = router;