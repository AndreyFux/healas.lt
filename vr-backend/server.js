const express = require('express');
const PORT = 3002;
const mongoose = require('mongoose');
const cors = require("cors");
const URL = 'mongodb://localhost:27017/vr_proj';
const movieRoutes = require('./routes/user-routes');
var bodyParser = require('body-parser');

mongoose
  .connect(URL)
  .then(() => { console.log("Connected to MongoDB") })
  .catch(() => { console.log(`DB connection error ${err}`) })
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
})

app.use(movieRoutes);
app.use(express.json());

