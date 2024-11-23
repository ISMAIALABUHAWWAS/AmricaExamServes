const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // to load environment variables from .env file

const app = express();

// CORS configuration
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Simple routes
app.get('/', (req, res) => {
  res.json({ message: 'Ahmad, you are awesome!' });
});

app.get('/omar', (req, res) => {
  res.json({ message: "Welcome to Omar's route!" });
});

// Connect to the database
mongoose
  .connect(process.env.DB_URL, {
    // using env variable for DB connection string
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// Import routes
require('./app/routes/turorial.routes')(app);
require('./app/routes/locations.routes')(app);
require('./app/routes/myQuizes.routes')(app);
require('./app/routes/dailyCash.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/discraption.routes')(app);
require('./app/routes/question.routes')(app);
require('./app/routes/courses.routes')(app);
require('./app/routes/authorization.routes')(app); // Only once
require('./app/routes/orderList.routes')(app);

// 404 error handler
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'false',
    message: 'Page Not Found',
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
