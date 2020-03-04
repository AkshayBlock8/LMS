/**
 * @swagger
 *  components:
 *    schemas:
 *      Leave:
 *        type: object
 *        required:
 *          - employeeId
 *          - approverId    
 *          - firstName
 *          - lastName
 *          - startDate
 *          - endDate
 *          - daysCount
 *          - leaveType
 *          - halfDay
 *          - status
 *        properties:
 *          employeeId:
 *              type: string
 *          approverId:
 *              type: string
 *          firstName:
 *              type: String
 *          lastName:
 *              type: String
 *          startDate:
 *              type: string
 *          endDate:
 *              type: string
 *          daysCount:
 *              type: Number
 *          leaveType:
 *              type: string
 *          halfDay:
 *              type: boolean 
 *          description:
 *              type: string 
 *          status:
 *              type: string 
 */

const Joi = require('joi');
const mongoose = require('mongoose');

 const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    approverId: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    daysCount: {
        type: Number,
        required: true
    },
    leaveType: {
        type: String,
        required: true  
    },
    halfDay: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true
    }
})

const Leave = mongoose.model('Leave', leaveSchema)

function validateLeave(leave) {
    const schema = {
        employeeId: Joi.string().required(),
        approverId: Joi.string().required(),
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(255).required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required(),
        leaveType: Joi.string().valid("paid", "casual", "sick").required(),
        halfDay: Joi.boolean().required(),
        description: Joi.string()
    }
    return Joi.validate(leave, schema);
}

exports.Leave = Leave
exports.schema = leaveSchema
exports.validate = validateLeave
