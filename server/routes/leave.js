const { Leave, validate } = require("../models/leave")
const { Employee } = require("../models/employee")
const _ = require("lodash")
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management
 */

/**
 * @swagger
 * path:
 *  /leave/:
 *    post:
 *      summary: Create a new employee
 *      tags: [Leaves]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Leave'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Leave'
 */

function sendValidationError(error, res) {
    return res.status(400).send(error.details[0].message);
}

function getLeaveDuration(start, end) {
    let startDate = new Date(start)
    let endDate = new Date(end)
    let count = 0;
    for(var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        console.log(d);
        let day = d.getDay()
        console.log(day)
        if(day == 0 || day == 6) {
            continue;
        }
        count++;
    }
    return count;
}

router.post('/', async (req, res) => { 
    let validationResult = validate(req.body);
    if(validationResult.error) return sendValidationError(validationResult.error, res);
    
    let employee = await Employee.findById(mongoose.Types.ObjectId(req.body.employeeId));
    if(!employee) return res.status(400).send('Invalid Employee Id')

    let approver = await Employee.findById(mongoose.Types.ObjectId(req.body.approverId));
    if(!approver) return res.status(400).send('Invalid Approver Id')

    let leaveDuration = getLeaveDuration(req.body.startDate, req.body.endDate);
    if(employee.available[req.body.leaveType] < leaveDuration) return res.status(400).send('Employee Does not have that many leaves')

    employee.available[req.body.leaveType] -= leaveDuration
    employee.availed[req.body.leaveType] += leaveDuration
    await employee.save()
    let leaveSchema = _.pick(req.body, ["employeeId", "approverId", "startDate", "endDate", "leaveType", "halfDay", "description", "status"])

    leaveSchema.status = "pending"
    leave = new Leave(leaveSchema);
    await leave.save();
    res.send(leave);
})

module.exports = router