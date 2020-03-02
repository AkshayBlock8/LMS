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
 *              firstName: Akshay
 *              lastName: Kumar
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
 *  /leave/employee/{employeeId}/{status}:
 *    get:
 *      parameters:
 *      - in: path
 *        name: employeeId
 *        required: true
 *        schema:
 *          type: string
 *        description: The _id of the employee document
 *      - in: path
 *        name: status
 *        required: true
 *        schema:
 *          type: string
 *        description: The status of the leaves you want to fetch
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
 *  /leave/approver/{employeeId}/{status}:
 *    get:
 *      parameters:
 *      - in: path
 *        name: employeeId
 *        required: true
 *        schema:
 *          type: string
 *        description: The _id of the employee document
 *      - in: path
 *        name: status
 *        required: true
 *        schema:
 *          type: string
 *        description: The status of the leaves you want to fetch 
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
    console.log(error.details[0].message)
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

function invalidDays(startDate, endDate, halfDay) {
    if(!halfDay)
        return false;

    let start = new Date(startDate)
    let end = new Date(endDate)
    return start.toString() !== end.toString()
}

function invalidEmployeeName(employee, names) {
    console.log(employee.firstName, employee.lastName)
    if(employee.firstName !== names.firstName || employee.lastName !== names.lastName)
        return true;
    return false;
}

router.post('/', async (req, res) => { 
    let validationResult = validate(req.body);
    if(validationResult.error) return sendValidationError(validationResult.error, res);

    if(invalidDays(req.body.startDate, req.body.endDate, req.body.halfDay)) return res.status(400).send('for half day start date and end date should be same')
    
    let employee = await Employee.findById(mongoose.Types.ObjectId(req.body.employeeId));
    if(!employee) return res.status(400).send('Invalid Employee Id')

    if(invalidEmployeeName(employee, _.pick(req.body, ["firstName", "lastName"]))) return res.status(400).send('employee names do not match the emp id')

    let approver = await Employee.findById(mongoose.Types.ObjectId(req.body.approverId));
    if(!approver) return res.status(400).send('Invalid Approver Id')

    if(employee.approver !== approver._id.toString()) return res.status(400).send(`${req.body.approverId} is not the approver of ${req.body.employeeId}`)

    let leaveDuration = getLeaveDuration(req.body.startDate, req.body.endDate);
    if(employee.available[req.body.leaveType] < leaveDuration) return res.status(400).send('Employee Does not have that many leaves')

    if(req.body.halfDay) {
        employee.available[req.body.leaveType] -= 0.5
        employee.availed[req.body.leaveType] += 0.5    
    } else {
        employee.available[req.body.leaveType] -= leaveDuration
        employee.availed[req.body.leaveType] += leaveDuration    
    }
    await employee.save()
    let leaveSchema = _.pick(req.body, ["employeeId", "approverId", "firstName", "lastName", "startDate", "endDate", "leaveType", "halfDay", "description", "status"])

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
    let mailOptionsEmp ={
        from: '"Admin LMS" lmsblock8@gmail.com', // sender address
        to: employee.email, // list of receivers
        subject: ""+leaveSchema.leaveType.charAt(0).toUpperCase()+leaveSchema.leaveType.slice(1)+" leave successfully applied by "+employee.firstName, // Subject line
        // text: "Hello world?", // plain text body
        html: "<p><b>You</b>"+" applied for a "+"<b>"+leaveSchema.leaveType+"</b>"+" leave from "+"<b>"+leaveSchema.startDate+"</b>"+" to "+"<b>"+leaveSchema.endDate+"</b>"+"<p><b>Reason:</b>"+leaveSchema.description // html body
    };
    em.email(mailOptions);
    em.email(mailOptionsEmp);
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

    let employee
    try {
        employee = await Employee.findById(employeeId);
    } catch(err) {
        return res.status(400).send('Invalid Employee Id format')
    }
    if(!employee) return res.status(400).send('Invalid Employee Id')

    const { error } = validateStatus(_.pick(req.params, ["status"]))
    let leaves
    if(error)
        leaves = await Leave.find({ employeeId: employeeId })
    else
        leaves = await Leave.find({ status: status, employeeId: employeeId })
    res.send(leaves)
})

router.get('/approver/:employeeId/:status', async (req, res) => {
    const { status, employeeId } = req.params
    let employee
    try {
        employee = await Employee.findById(employeeId);
    } catch(err) {
        return res.status(400).send('Invalid Employee Id format')
    }
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
    let validationResult = validate(_.pick(req.body, ["employeeId", "approverId", "startDate", "endDate", "leaveType", "halfDay", "description", "firstName", "lastName"]));
    if(validationResult.error) return sendValidationError(validationResult.error, res);

    const leave = await Leave.findById(req.body._id);
    if(!leave) return res.status(400).send('Invalid Leave Id provided')
    if(req.body.status === "rejected" && leave.status === "pending") {
        const employee = await Employee.findById(req.body.employeeId)
        if(!employee) return res.status(400).send('Invalid Employee Id')
        if(leave.halfDay) {
            employee.available[req.body.leaveType] += 0.5;
            employee.availed[req.body.leaveType] -= 0.5;    
        } else {
            employee.available[req.body.leaveType] += getLeaveDuration(req.body.startDate, req.body.endDate);
            employee.availed[req.body.leaveType] -= getLeaveDuration(req.body.startDate, req.body.endDate);    
        }
        await employee.save();
        leave.status = "rejected";
        await leave.save();
        let mailOptionsRejected ={
            from: '"Admin LMS" lmsblock8@gmail.com', // sender address
            to: employee.email, // list of receivers
            subject: "[REJECTED]-"+leave.leaveType.charAt(0).toUpperCase()+leave.leaveType.slice(1)+" leave applied by "+employee.firstName, // Subject line
            // text: "Hello world?", // plain text body
            html: "<p>The "+leave.leaveType+"</b>"+" leave that you applied from "+"<b>"+leave.startDate+"</b>"+" to "+"<b>"+leave.endDate+"</b> has been rejected." // html body
        };
        em.email(mailOptionsRejected);
        return res.send(leave)
    } else if(req.body.status === "approved" && leave.status === "pending") {
        const employee = await Employee.findById(req.body.employeeId)
        if(!employee) return res.status(400).send('Invalid Employee Id')

        leave.status = "approved";
        await leave.save();
        let mailOptionsApproved ={
            from: '"Admin LMS" lmsblock8@gmail.com', // sender address
            to: employee.email, // list of receivers
            subject: "[APPROVED]-"+leave.leaveType.charAt(0).toUpperCase()+leave.leaveType.slice(1)+" leave applied by "+employee.firstName, // Subject line
            // text: "Hello world?", // plain text body
            html: "<p>The "+leave.leaveType+"</b>"+" leave that you applied from "+"<b>"+leave.startDate+"</b>"+" to "+"<b>"+leave.endDate+"</b> has been approved." // html body
        };
        em.email(mailOptionsApproved);
        return res.send(leave)
    }
})

module.exports = router