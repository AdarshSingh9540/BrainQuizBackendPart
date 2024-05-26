const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// Importing routes
const questionRoutes = require('./routes/route');

// Mounting routes
app.use('/api', questionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
