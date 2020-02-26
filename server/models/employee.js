/**
 * @swagger
 *  components:
 *    schemas:
 *      Employee:
 *        type: object
 *        required:
 *          - firstName
 *          - middleName
 *          - lastName
 *          - email
 *          - doj
 *          - status
 *          - role
 *          - approver
 *          - gender
 *          - password
 *        properties:
 *          firstName:
 *              type: string
 *          middleName:
 *              type: string
 *          lastName:
 *              type: string
 *          email:
 *              type: email
 *              format: email
 *              descriptions: Email for the user, needs to be unique.
 *          doj: 
 *              type: string
 *          role:
 *              type: string
 *          approver:
 *              type: string
 *          gender:
 *              type: string
 *          password:
 *              type: string
 *          available:
 *              $ref: '#/components/schemas/LeaveType' 
 *          availed:
 *              $ref: '#/components/schemas/LeaveType' 
 *          total:
 *              $ref: '#/components/schemas/LeaveType' 
 *        example:
 *           firstName: Akshay
 *           lastName: Kumar
 *           email: akshay.kumar@block8.com
 *           doj: 09-02-2020
 *           role: admin
 *           approver: akshay.kumar@block8.com
 *           gender: male
 *           password: 123456789
 */

const Joi = require('joi');
const mongoose = require('mongoose');
const leaveType = require('./leaveType')
const Employee = mongoose.model('Employee', new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    middleName: {
        type: String,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    doj: {
        type: Date,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    role: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    approver: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    available: {
        type: leaveType.schema
    },
    availed: {
        type: leaveType.schema
    },
    total: {
        type: leaveType.schema
    }
}))

function validateEmployee(employee) {
    const schema = {
        firstName: Joi.string().min(3).max(50).required(),
        middleName: Joi.string().min(0).max(255).allow(""),
        lastName: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).email(),
        doj: Joi.string().min(5).max(255).required(),
        gender: Joi.string().valid("male", "female", "other"),
        role: Joi.string().min(5).max(255).required(),
        approver: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(employee, schema);
}

exports.Employee = Employee;
exports.validate = validateEmployee;