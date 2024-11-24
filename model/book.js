// MVC --> Model, View, Controller (Routers)
const mongoose = require('mongoose');

// Create a model class for Book
const bookModel = mongoose.Schema(
  {
    Name: { type: String, required: true },
    Author: { type: String, required: true },
    Published: { type: String, required: true },
    Description: { type: String, required: true },
    Price: { type: Number, required: true }
  },
  {
    collection: "Bio_books" // Specify the MongoDB collection name
  }
);

module.exports = mongoose.model('Book', bookModel);
