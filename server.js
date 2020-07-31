const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const db = require("./models");

//We NEED express.json() and express.urlencoded() for POST and PUT requests,
//because in both these requests we are sending data(in the form of some data 
//to the server and we are asking the server to accept or store that data(object), 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(logger("dev"));

// Database connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
})

// respond with index.html when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//This route path will match requests to the root route, /stats.
app.get('/stats', (req, res) => {
    res.sendFile(path.normalize(__dirname + "/public/stats.html"));
})

//This route path will match requests to /api/workouts.
app.get('/api/workouts', (req, res) => {
    db.Workout.find({}).then(data => {
        console.log(data);
        res.json(data);
    });
});

app.get('/api/workouts/range', (req, res) => {
    db.Workout.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(404).json(err.message);
    });
});

//This route path will match requests to /api/workout/Id find by ID enter by user
app.put('/api/workouts/:id', (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id,
        { $push: { exercises: req.body } }, (err, data) => {
            if (err) console.log(err);
            else res.json(data);
        })
});

//Respond to POST request by creating a new workout Data in D\B

app.post('/api/workouts', (req, res) => [
    db.Workout.create(req.body, (err, data) => {
        if (err) console.log(err);
        else res.json(data);
    })
]);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log('Listening on http://localhost:' + PORT);
});