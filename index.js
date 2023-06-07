const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const getData = require('./controller/Data');
const Events = require('./controller/Event');
const User = require('./controller/User');


//Connecting to thw mongodb
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log(err);
  });


app.use(bodyParser.json());
app.use(cors());

app.use("/api/data", getData);
app.use("/api/v3/app",Events);
app.use("/api/user",User);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
