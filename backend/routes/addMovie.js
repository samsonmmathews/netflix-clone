const express = require('express');
const router = express.Router();

router.post('/fetch-movie', async (req, res) => {
    console.log("Movie fetched")
})

module.exports = router;