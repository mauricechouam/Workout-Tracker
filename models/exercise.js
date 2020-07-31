const mongose = require("mongoose");
const Schema = mongose.Schema;

const ExerciseDB = new Schema({
    type: String,
    name: String,
    duration: String,
    weight: Number,
    resps: Number,
    sets: Number,
    distance: Number
});

const Exercise = mongose.model("Exercise", ExerciseDB);
module.exports = Exercise;