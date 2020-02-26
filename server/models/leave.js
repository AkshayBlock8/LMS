/**
 * @swagger
 *  components:
 *    schemas:
 *      Leave:
 *        type: object
 *        required:
 *          - employeeId
 *          - approverId    
 *          - startDate
 *          - endDate
 *          - leaveType
 *          - halfDay
 *        properties:
 *          employeeId:
 *              type: string
 *          approverId:
 *              type: string
 *          startDate:
 *              type: string
 *          endDate:
 *              type: string
 *          leaveType:
 *              type: string
 *          halfDay:
 *              type: boolean 
 *          description:
 *              type: string 
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */

const Joi = require('joi');
const mongoose = require('mongoose');

 const leave = new mongoose.Schema({
    employeeId: {
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
    leaveType: {
        type: string,
        required: true  
    },
    halfDay: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
    }
})

const LeaveType = mongoose.model('LeaveType', leaveTypeSchema)

function validateLeave(leave) {
    const schema = {
        employeeId: Joi.required().string(),
        approverId: Joi.required().string(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        leaveType: Joi.string().required(),
        halfDay: Joi.boolean().required(),
        description: Joi.string()
    }
    return Joi.validate(leave, schema);
}

exports.LeaveType = LeaveType
exports.schema = leaveTypeSchema
exports.validate = validateLeave
