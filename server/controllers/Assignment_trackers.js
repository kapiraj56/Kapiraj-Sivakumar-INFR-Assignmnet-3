var express = require('express');
var router = express.Router();
let Assignment = require('../models/Assignment_trackers');

// Route to display the assignment list
router.get('/', async (req, res, next) => { //< Use router.get
  try {
    const AssignmentList = await Assignment.find(); //< Use await
    res.render('assignment/list', {
      title: 'Assignment List',
      AssignmentList: AssignmentList,
    });
  } catch (err) {
    console.error(err);
    res.render('assignment/list', {
      error: 'Error on server',
    });
  }
});

// Route to add an assignment
router.get('/add', async (req, res, next) => {
  try {
    res.render('assignment/add', {
      title: 'Add Assignment',
    });
  } catch (err) {
    console.error(err);
    res.render('assignment/list', {
      error: 'Error on the server',
    });
  }
});

// Route to process adding an assignment
router.post('/add', async (req, res, next) => {
  try {
    let newAssignment = new Assignment({
      Name: req.body.Name,
      Subject: req.body.Subject,
      Deadline: req.body.Deadline,
      Overview: req.body.Overview,
      Weight: req.body.Weight,
    });

    await Assignment.create(newAssignment);
    res.redirect('/assignmentslist');
  } catch (error) {
    console.error(error);
    res.render('assignment/list', {
      error: 'Error on the server',
    });
  }
});

// Route to edit an assignment
router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const assignmentToEdit = await Assignment.findById(id);
    res.render('assignment/edit', {
      title: 'Edit Assignment',
      Assignment: assignmentToEdit,
    });
  } catch (error) {
    console.error(error);
    res.render('assignment/list', {
      error: 'Error on the server',
    });
  }
});

// Route to process editing an assignment
router.post('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    let updatedAssignment = {
      Name: req.body.Name,
      Subject: req.body.Subject,
      Deadline: req.body.Deadline,
      Overview: req.body.Overview,
      Weight: req.body.Weight,
    };

    await Assignment.findByIdAndUpdate(id, updatedAssignment);
    res.redirect('/assignmentslist');
  } catch (error) {
    console.error(error);
    res.render('assignment/list', {
      error: 'Error on the server',
    });
  }
});

// Route to delete an assignment
router.get('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Assignment.deleteOne({ _id: id });
    res.redirect('/assignmentslist');
  } catch (error) {
    console.error(error);
    res.render('assignment/list', {
      error: 'Error on the server',
    });
  }
});

module.exports = router; //< Export the router
