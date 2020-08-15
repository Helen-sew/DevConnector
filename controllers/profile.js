const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/profile');
const User = require('../models/user');

//@route    GET /profile/me
//@desc     Get current users profile
//@access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar'] //populate from user model
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    //if there is profile
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;