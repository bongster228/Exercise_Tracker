const router = require('express').Router();
const Exercise = require('../models/exercise.model');

// Exercises Get Route
router.route('/').get(async (req, res) => {
  await Exercise.find((err, exercieses) => {
    if (err) {
      res.status(400).json(`Error: ${err}`);
    } else {
      res.json(exercieses);
    }
  });
});

// Create Route
router.route('/add').post(async (req, res) => {
  const { username, description, duration, date } = req.body;

  console.log(req.body);

  const newExercise = await new Exercise({
    username,
    description,
    duration,
    date,
  });

  try {
    await newExercise.save();
    res.json('Exercise Added!');
  } catch (err) {
    console.log(err);
  }
});

// Show Route
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  await Exercise.findById(id, (err, foundExercise) => {
    if (err) {
      res.status(400).json(`Error: ${err}`);
    } else {
      res.json(foundExercise);
    }
  });
});

// Delete Route
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await Exercise.findByIdAndDelete(id, (err) => {
    if (err) {
      res.status(400).json(`Error: ${err}`);
    } else {
      res.json('Exercise Deleted');
    }
  });
});

// Update Route
router.route('/update/:id').post(async (req, res) => {
  const { id } = req.params;

  // Get the updated data
  const { username, description, duration, date } = req.body;

  // Create the updated object
  const updatedExercise = {
    username,
    description,
    duration,
    date,
  };

  await Exercise.findByIdAndUpdate(id, updatedExercise, (err) => {
    if (err) {
      res.status(400).json(`Error: ${err}`);
    } else {
      res.json('Exercise Updated');
    }
  });

  //   await Exercise.findById(id, (err, foundExercise) => {
  //     if (err) {
  //       res.status(400).json(`Error: ${err}`);
  //     } else {
  //       foundExercise.username = username;
  //       foundExercise.description = description;
  //       foundExercise.duration = Number(duration);
  //       foundExercise.date = Date.parse(date);

  //       foundExercise
  //         .save()
  //         .then(() => res.json('Exercise updated'))
  //         .catch(err => res.status(400).json(`Error: ${err}`));
  //     }
  //   });
});

module.exports = router;
