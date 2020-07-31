//This route path will match requests to /api/workouts.
app.get('/exercise', (req, res) => {
    db.Workout.find({}).then(data => {
        console.log(data);
        res.json(data);
    });
});