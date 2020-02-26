const { Employee } = require("../models/employee")
const _ = require("lodash")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => { 
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let employee = await Employee.findOne({ email: req.body.email });
    if(!employee) return res.status(400).send('Invalid username or Password')

    let isValidUser = employee.password === req.body.password
    if(!isValidUser) return res.status(400).send('Invalid username or Password')

    const token = jwt.sign({ _id: employee._id, name: employee.name, email: employee.email }, "jsonPrivateKey")

    res.send(token);
})

function validate(employee) {
    const schema = {
        email: Joi.string().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(employee, schema);
}

module.exports = router