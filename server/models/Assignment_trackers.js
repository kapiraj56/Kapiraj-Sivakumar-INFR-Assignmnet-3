let mongoose = require('mongoose');

// create a model class
let assignmentModel = mongoose.Schema({
    Name:String,
    Subject:String,
    Deadline:String,
    Overview:String,
    Weight: Number
},
{
    collection:"Assignment_trackers"
});
module.exports = mongoose.model('Assignment',assignmentModel);
