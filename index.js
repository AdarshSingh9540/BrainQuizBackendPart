const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());


const questionRoutes = require('./routes/route');


app.use('/api', questionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
