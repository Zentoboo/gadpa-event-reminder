require('dotenv').config();
const express = require('express');
const cors = require('cors');
const reminderRoutes = require('./routes/reminders');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reminders', reminderRoutes);

// Test DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
    connection.release();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});