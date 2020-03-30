const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get(async (req, res) => {
  await User.find((err, users) => {
    if (err) {
      res.status(400).json(`Error: ${err}`);
    } else {
      res.json(users);
    }
  });
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
