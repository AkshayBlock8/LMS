const { Employee, validate } = require("../models/employee")
const leaveType = require("../models/leaveType")
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
 *  /employee/:
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
 *  /employee/:id:
 *    get:
 *      summary: Get Employee by Id
 *      tags: [Employees]
 *      requestBody:
 *        required: true
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

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    let employee = await Employee.findById(id);
    if (!employee) return res.status(400).send("record not found");
    res
      .status(200)
      .send(
        _.pick(employee, [
          "firstName",
          "secondName",
          "lastName",
          "email",
          "doj",
          "status",
          "role",
          "approver",
          "gender",
          "password"
        ])
      );
  });

router.post('/', async (req, res) => { 
    let validationResult = validate(req.body);
    if(validationResult.error) return sendValidationError(validationResult.error, res);
    
    let employee = await Employee.findOne({ email: req.body.email });
    if(employee) return res.status(400).send('User Already Registered')

    if(req.body.role !== "admin") {
        let approver = await Employee.findById(mongoose.Types.ObjectId(req.body.approver))
        if(!approver) return res.status(400).send('Entered approver doesn\'t exist')
    }

    const availed = {
        sick: 0,
        casual: 0,
        paid: 0
    };
    validationResult = leaveType.validate(availed);
    if(validationResult.error) return sendValidationError(validationResult.error, res)

    const available =  {
        sick: 10,
        casual: 10,
        paid: 10
    };
    validationResult = leaveType.validate(available);
    if(validationResult.error) return sendValidationError(validationResult.error, res)

    const total = {
        sick: 10,
        casual: 10,
        paid: 10
    };
    validationResult = leaveType.validate(total);
    if(validationResult.error) return sendValidationError(validationResult.error, res)
    
    let employeeSchema = _.pick(req.body, ["firstName", "middleName", "lastName", "email", "doj", "role", "approver", "gender", "password", "status"]);
    employeeSchema.available = available;
    employeeSchema.availed = availed;
    employeeSchema.total = total;
    

    employee = new Employee(employeeSchema);
    await employee.save();
    res.send(_.pick(employee, ["firstName", "secondName", "lastName", "email", "doj", "role", "approver", "gender", "password"]));
})

module.exports = router