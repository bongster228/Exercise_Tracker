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

module.exports = router;
