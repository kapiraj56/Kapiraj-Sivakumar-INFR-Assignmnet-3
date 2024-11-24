var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Assignment = require('../models/Assignment_trackers');

module.exports.DislayAssignmentlist = async (req,res,next)=>{ //< Mark function as async
    try{
       const AssignmentList = await Assignment.find(); //< Use of await keyword
       res.render('assignment/list', {
          title: 'Assignment List', 
          AssignmentList: AssignmentList
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('assignment/list', {
          error: 'Error on server'
       });
    }
 };

 module.exports.AddAssignment = async (req,res,next)=>{
    try{
        res.render('assignment/add',
        {
            title:'Add Assignment'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('assignment/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.ProcessAssignment = async (req,res,next)=>{
    try{
        let newAssignment = Assignment({
            "Name":req.body.Name,
            "Subject": req.body.Subject,
            "Deadline": req.body.Deadline,
            "Overview": req.body.Overview,
            "Weight": req.body.Weight
        });
        Assignment.create(newAssignment).then(() =>{
            res.redirect('/assignmentslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('assignment/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.EditAssignment = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const assignmentToEdit = await Assignment.findById(id);
    res.render('assignment/edit',
    {
        title:'Edit Assignment',
        Assignment:assignmentToEdit
    })
}
catch(error){
    console.error(err);
    res.render('assignment/list',
    {
        error: 'Error on the server'
    });
}
}

module.exports.ProcessEditAssignment = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedAssignment = Assignment({
            "_id":id,
            "Name":req.body.Name,
            "Subject": req.body.Subject,
            "Deadline": req.body.Deadline,
            "Overview": req.body.Overview,
            "Weight": req.body.Weight
        });
        Assignment.findByIdAndUpdate(id,updatedAssignment).then(()=>{
            res.redirect('/assignmentslist')
        });
    }
    catch(error){
        console.error(err);
        res.render('assignment/list',
        {
            error: 'Error on the server'
        });
    }
}

module.exports.DeleteAssignment = (req,res,next)=>{
    try{
        let id = req.params.id;
        Assignment.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/assignmentslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('assignment/list',
        {
            error: 'Error on the server'
        });
    }
}