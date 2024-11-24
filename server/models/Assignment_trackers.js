const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for assignments
const assignmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
});

// Create the model using the schema
const assignmentModel = mongoose.model('Assignment', assignmentSchema);

// Export the model
module.exports = assignmentModel;

