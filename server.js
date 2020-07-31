const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
const db = require("./models");

//We NEED express.json() and express.urlencoded() for POST and PUT requests,
//because in both these requests we are sending data(in the form of some data 
//to the server and we are asking the server to accept or store that data(object), 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(morgan("dev"));


// Database connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
})


//This route path will match requests to /api/workouts.


//Respond to POST request by creating a new workout Data in D\B

app.post('/api/workouts', (req, res) => [
    db.Workout.create(req.body, (err, data) => {
        if (err) console.log(err);
        else res.json(data);
    })
]);

// Creating Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log('Listening on http://localhost:' + PORT);
});