var path = require("path");

module.exports = function (app) {
    // respond with index.html when a GET request is made to the homepage
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });


    //This route path will match requests to the root route,/exercise.
    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });


    //This route path will match requests to the root route, /stats.
    app.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });
}