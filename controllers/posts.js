const express = require('express');
const router = express.Router();

//@route    GET controllers/posts
//@desc     Text route
//@access   Public
router.get('/', (req, res) => res.send('posts route'));

module.exports = router;
