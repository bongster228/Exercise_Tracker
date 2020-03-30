const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CONFIG APP
app.use(cors());
app.use(express.json());

// CONFIG MONGOOSE
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Check MongoDB Atlas connection
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// ROUTES
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
