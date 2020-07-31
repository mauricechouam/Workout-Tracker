const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutdb = new Schema({
  day: {
    type: String,
    default: Date.now
  },
  numExercises: { type: Number },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Enter an exercise type"
      },
      name: {
        type: String,
        trim: true,
        required: "Enter an exercise name"
      },
      duration: {
        type: Number,
        required: "Enter an exercise duration in minutes"
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ]
}, {
  toJSON:{ virtual: true },
  toObject: {virtuals:true} 
});

//adds a dynamically-created proprety to schema
workoutdb.virtual("totalDuration").get(function () {
  //"reduce"array of exercises down to just the sum of their duration 
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});
const Workout = mongoose.model("Workout", workoutdb);

module.exports = Workout;
