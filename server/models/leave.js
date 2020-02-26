/**
 * @swagger
 *  components:
 *    schemas:
 *      Leave:
 *        type: object
 *        required:
 *          - startDate
 *          - endDate
 *          - leaveType
 *          - halfDay
 *        properties:
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
