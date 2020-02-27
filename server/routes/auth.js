const { Employee } = require("../models/employee")
const _ = require("lodash")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * path:
 *  /auth/:
 *    post:
 *      summary: Returns the auth credentials of the user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *            example:
 *              email: akshay.kumar@block8.com
 *              password: "123456789"
 *      responses:
 *        "200":
 *          description: A Leave Schema
 *          content:
 *            application/json:
 *              example:
 *                  email: akshay.kumar@block8.com
 *                  name: Akshay Kumar
 *                  _id: 5e5644860cf7b449936036ea
 */

router.post('/', async (req, res) => { 
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let employee = await Employee.findOne({ email: req.body.email });
    if(!employee) return res.status(400).send('Invalid username or Password')

    let isValidUser = employee.password === req.body.password
    if(!isValidUser) return res.status(400).send('Invalid username or Password')

    //const token = jwt.sign({ _id: employee._id, name: employee.name, email: employee.email }, "jsonPrivateKey")
    const token = {
        _id: employee._id,
        name: `${ employee.firstName } ${ employee.lastName }`,
        email: employee.email
    }
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