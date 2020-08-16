const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
const Post = require('../models/post');
//const Profile = require('..models/profile');
const { check, validationResult } = require('express-validator');

//@route    POST /posts
//@desc     Create a post
//@access   Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password'); //todo this so that we can get user, name and avatar user database

      const newPost = new Post({
        text: req.body.text, //come from user input
        name: user.name, //come from user db
        avatar: user.avatar, //come from user db
        user: req.user.id, //come from login user id
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET /posts
//@desc     Get all posts
//@access   Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); //sort by the recent posts
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET /posts/:id
//@desc     Get post by ID
//@access   Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Posts not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Posts not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    DELETE /posts/:id
//@desc     Delete a post
//@access   Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check user (only owner of the post can delete)
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Posts not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
