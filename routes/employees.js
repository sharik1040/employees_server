const express = require('express');
const router = express.Router();
const Employee =  require('../models/Employee');

router.get('/', async (req, res) => {
    try{
        const employees = await Employee.find();
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', "*")
        res.json(employees);
    }catch(err){
        res.json({message: err});
    }
});

router.post('/add',async (req, res) => {
    let employee = await Employee.findOne({ fullName: req.body.fullName });
    if(employee){
        return res.status(400).send('That employee is already exisit!');
    }else {
        employee = new Employee({
            fullName: req.body.fullName,
            birth: req.body.birth,
            gender: req.body.gender,
            contact: req.body.contact,
            salary: req.body.salary,
            position: req.body.position,
            income: req.body.income
        });

        try{
            const employees = await employee.save();
            res.json(employees);
        }catch(err){
            console.log(err);
            res.json(err);
        }
    }
});

router.delete('/:employeeId', async (req, res) => {
    try{
        const removedItem = await Employee.remove({_id: req.params.employeeId});
        res.json(removedItem);
    }catch(err){
        res.json({message: err});
    }
});

router.put('/:employeedId', async (req, res) => {
    try{
        const updatedPost = await Employee.findOneAndUpdate({_id: req.params.employeeId},
            { $set: {
                fullName: req.body.fullName,
                birth: req.body.birth,
                gender: req.body.gender,
                contact: req.body.contact,
                salary: req.body.salary,
                position: req.body.position,
                income: req.body.income
            } }, { returnNewDocument: true });
            res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
});



module.exports = router;