const router = require('express').Router();
const User = require('../models/user.model');

// User Get Route
// Responds with an array of all the available users
router.route('/').get(async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.route('/add').post(async (req, res) => {
  const { username } = req.body;

  const newUser = await new User({ username });

  try {
    await newUser.save();
    res.json('User added!');
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

module.exports = router;
