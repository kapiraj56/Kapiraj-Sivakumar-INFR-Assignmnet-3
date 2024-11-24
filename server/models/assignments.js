// MVC --> Model, View, Controller (Routers)
const mongoose = require('mongoose');

// Create a model class for Book
const bookModel = mongoose.Schema(
  {
    Name:String,
    Subject:String,
    Deadline:String,
    Overview:String,
    Weight:Number,
  },
  {
    collection: "Assignment_trackers"
  });

module.exports = mongoose.model('Assignment', assignmentModel);
