/**
 * @swagger
 *  components:
 *    schemas:
 *      LeaveType:
 *        type: object
 *        required:
 *          - casual
 *          - paid
 *          - sick
 *        properties:
 *          casual:
 *              type: integer
 *          paid:
 *              type: integer
 *          sick:
 *              type: integer 
 *
 */

 const Joi = require('joi');
const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema({
    sick: {
        type: Number
    },
    casual: {
        type: Number
    },
    paid: {
        type: Number
    }
})

const LeaveType = mongoose.model('LeaveType', leaveTypeSchema)

function validateLeaveType(leaveType) {
    const schema = {
        sick: Joi.number().min(0).required(),
        casual: Joi.number().min(0).required(),
        paid: Joi.number().min(0).required()
    }
    return Joi.validate(leaveType, schema);
}

exports.LeaveType = LeaveType
exports.schema = leaveTypeSchema
exports.validate = validateLeaveType