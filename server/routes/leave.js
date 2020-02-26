const { Employee, validate } = require("../models/employee")
const leaveType = require("../models/leaveType")
const _ = require("lodash")
const express = require('express');
const router = express.Router();

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
 *      tags: [Employees]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Employee'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Employee'
 */

function sendValidationError(error, res) {
    return res.status(400).send(error.details[0].message);
}

router.post('/', async (req, res) => { 
    let validationResult = validate(req.body);
    if(validationResult.error) return sendValidationError(validationResult.error, res);
    
    let employee = await Employee.findOne({ email: req.body.email });
    if(employee) return res.status(400).send('User Already Registered')

    let employeeSchema = _.pick(req.body, ["firstName", "middleName", "lastName", "email", "doj", "role", "approver", "gender", "password"]);
    employeeSchema.available = available;
    employeeSchema.availed = availed;
    employeeSchema.total = total;
    

    employee = new Employee(employeeSchema);
    await employee.save();
    res.send(_.pick(employee, ["firstName", "secondName", "lastName", "email", "doj", "role", "approver", "gender", "password"]));
})

module.exports = router