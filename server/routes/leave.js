const { Leave, validate } = require("../models/leave")
const { Employee } = require("../models/employee")
const _ = require("lodash")
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Joi = require("joi")
const em = require('../utils/email')

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
 *      summary: Create a new leave, please make sure that the employeeid and the approver id are valid
 *      tags: [Leaves]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Leave'
 *
 *            example:
 *              employeeId: 5e5644860cf7b449936036ea
 *              approverId: 5e564317ef4e004870fc701f
 *              startDate: 2020-02-29
 *              endDate: 2020-03-05
 *              leaveType: sick
 *              halfDay: false
 *              description: desc
 *      responses:
 *        "200":
 *          description: A Leave Schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Leave'
 *
 *  /leave/employee/:employeeId/:status:
 *    get:
 *      summary: Get leaves which have the employee id as the current employee
 *      tags: [Leaves]
 *      responses:
 *        "200":
 *          description: A leave schema
 *          content:
 *            application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Leave'
 *
 *  /leave/approver/:employeeId/:status:
 *    get:
 *      summary: Get leaves which have the approver id as the current employee
 *      tags: [Leaves]
 *      responses:
 *        "200":
 *          description: A leave schema
 *          content:
 *            application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Leave'
 *
 *  /leave:
 *    put:
 *      summary: Updates the status of the given leave
 *      tags: [Leaves]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Leave'
 *            examples:
 *              Rejection:
 *                value:
 *                  _id: 5e577322c048ad29414695bf
 *                  employeeId: 5e5644860cf7b449936036ea
 *                  approverId: 5e564317ef4e004870fc701f
 *                  startDate: 2020-02-29
 *                  endDate: 2020-03-05
 *                  leaveType: sick
 *                  halfDay: false
 *                  status: rejected
 *                  description: desc
 *
 *              Approval:
 *                value:
 *                  _id: 5e577322c048ad29414695bf
 *                  employeeId: 5e5644860cf7b449936036ea
 *                  approverId: 5e564317ef4e004870fc701f
 *                  startDate: 2020-02-29
 *                  endDate: 2020-03-05
 *                  leaveType: sick
 *                  halfDay: false
 *                  status: approved
 *                  description: desc
 *
 *      responses:
 *        "200":
 *          description: A leave schema
 *          content:
 *            application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Leave'
 *
 */

function sendValidationError(error, res) {
    return res.status(400).send(error.details[0].message);
}

function getLeaveDuration(start, end) {
    let startDate = new Date(start)
    let endDate = new Date(end)
    let count = 0;
    for(var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        let day = d.getDay()
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

    if(employee.approver !== approver._id.toString()) return res.status(400).send(`${req.body.approverId} is not the approver of ${req.body.employeeId}`)

    let leaveDuration = getLeaveDuration(req.body.startDate, req.body.endDate);
    if(employee.available[req.body.leaveType] < leaveDuration) return res.status(400).send('Employee Does not have that many leaves')

    employee.available[req.body.leaveType] -= leaveDuration
    employee.availed[req.body.leaveType] += leaveDuration
    await employee.save()
    let leaveSchema = _.pick(req.body, ["employeeId", "approverId", "startDate", "endDate", "leaveType", "halfDay", "description", "status"])

    leaveSchema.status = "pending"
    leave = new Leave(leaveSchema);
    await leave.save();
    let mailOptions ={
        from: '"Admin LMS" lmsblock8@gmail.com', // sender address
        to: approver.email, // list of receivers
        subject: ""+leaveSchema.leaveType.charAt(0).toUpperCase()+leaveSchema.leaveType.slice(1)+" leave applied by "+employee.firstName, // Subject line
        // text: "Hello world?", // plain text body
        html: "<p><b>"+employee.firstName+"</b>"+" applied for a "+"<b>"+leaveSchema.leaveType+"</b>"+" leave from "+"<b>"+leaveSchema.startDate+"</b>"+" to "+"<b>"+leaveSchema.endDate+"</b>"+"<p><b>Reason:</b>"+leaveSchema.description // html body
    };
    em.email(mailOptions);
    res.send(leave);
})

function validateStatus(status) {
    const schema = {
        status: Joi.string().valid('pending', 'approved', 'rejected')
    }
    return Joi.validate(status, schema);
}

router.get('/employee/:employeeId/:status', async (req, res) => {
    const { status, employeeId } = req.params
    console.log(status)
    let employee = await Employee.findById(mongoose.Types.ObjectId(employeeId));
    if(!employee) return res.status(400).send('Invalid Employee Id')

    const { error } = validateStatus(_.pick(req.params, ["status"]))
    if(error) return res.status(400).send('Invalid status entered')

    if(error)
        leaves = await Leave.find({ employeeId: employeeId })
    else
        leaves = await Leave.find({ status: status, employeeId: employeeId })
    res.send(leaves)
})

router.get('/approver/:employeeId/:status', async (req, res) => {
    const { status, employeeId } = req.params
    console.log(status)
    let employee = await Employee.findById(mongoose.Types.ObjectId(employeeId));
    if(!employee) return res.status(400).send('Invalid Employee Id')

    const { error } = validateStatus(_.pick(req.params, ["status"]))
    let leaves;
    if(error)
        leaves = await Leave.find({ approverId: employeeId })
    else
        leaves = await Leave.find({ status: status, approverId: employeeId })
    res.send(leaves)
})

router.put('/', async (req, res) => {
    let validationResult = validate(_.pick(req.body, ["employeeId", "approverId", "startDate", "endDate", "leaveType", "halfDay", "description"]));
    if(validationResult.error) return sendValidationError(validationResult.error, res);

    const leave = await Leave.findById(req.body._id);
    if(!leave) return res.status(400).send('Invalid Leave Id provided')
    if(req.body.status === "rejected" && leave.status === "pending") {
        const employee = await Employee.findById(req.body.employeeId)
        if(!employee) return res.status(400).send('Invalid Employee Id')

        employee.available[req.body.leaveType] += getLeaveDuration(req.body.startDate, req.body.endDate);
        employee.availed[req.body.leaveType] -= getLeaveDuration(req.body.startDate, req.body.endDate);

        await employee.save();
        leave.status = "rejected";
        await leave.save();
        return res.send(leave)
    } else if(req.body.status === "approved" && leave.status === "pending") {
        const employee = await Employee.findById(req.body.employeeId)
        if(!employee) return res.status(400).send('Invalid Employee Id')

        leave.status = "approved";
        await leave.save();
        return res.send(leave)
    }
})

module.exports = router