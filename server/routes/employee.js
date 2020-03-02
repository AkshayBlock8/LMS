const { Employee, validate } = require("../models/employee")
const leaveType = require("../models/leaveType")
const _ = require("lodash")
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
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
 *
 *            examples:
 *              Admin:
 *                value:
 *                  firstName: Akshay
 *                  lastName: Kumar
 *                  email: akshay.kumar@block8.com
 *                  doj: 2020-02-09
 *                  role: admin
 *                  approver: ""
 *                  gender: male
 *                  status: active
 *                  password: "12111"
 *
 *              Employee:
 *                value:
 *                  firstName: Akshay
 *                  lastName: Kumar
 *                  email: akshay.kumar@block8.com
 *                  doj: 2020-02-09
 *                  role: employee
 *                  approver: 5e5644860cf7b449936036ea
 *                  gender: male
 *                  status: active
 *                  password: "12111"
 *
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Employee'
 *
 *  /employee/{id}/:
 *    get:
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The _id of the document
 *      summary: Get Employee by Id, employee id must be provided as :id
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
 *        "400":
 *          description: A user schema
 *          content:
 *            text/plain:
 *              schema:
 *                 type: string
 *                 example: record not found
 *
 *    put:
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The _id of the document
 *      summary: Updates the employee record
 *      tags: [Employees]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Employee'
 * 
 *        examples:
 *          examples:
 *              Admin:
 *                value:
 *                  firstName: Akshay
 *                  lastName: Kumar
 *                  email: akshay.kumar@block8.com
 *                  doj: 2020-02-09
 *                  role: admin
 *                  approver: ""
 *                  gender: male
 *                  status: active
 *                  password: "12111"
 *
 *              Employee:
 *                value:
 *                  firstName: Akshay
 *                  lastName: Kumar
 *                  email: akshay.kumar@block8.com
 *                  doj: 2020-02-09
 *                  role: employee
 *                  approver: 5e5644860cf7b449936036ea
 *                  gender: male
 *                  status: active
 *                  password: "12111"
 *
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Employee'
 *
 */

function sendValidationError(error, res) {
    console.log(error.details[0].message)
    return res.status(400).send(error.details[0].message);
}

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    let employee;
    try {
        employee = await Employee.findById(id)
    } catch(err) {
        return res.status(400).send("Invalid Id format")
    }
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
          "password",
          "available",
          "total",
          "availed"
        ])
      );
  });

  router.put('/:id',async(req,res)=>{
    const id = req.params.id;

    let validationResult = validate(req.body);
    if(validationResult.error) return sendValidationError(validationResult.error, res); 

    let employee = await Employee.findOne({ email: req.body.email })
    if (employee && employee._id!=id) return res.status(400).send('Email Already in use')

    if(req.body.role !== "admin") {
        let approver
        try {
            approver = await Employee.findById(req.body.approver)
        } catch(err) {
            return res.status(400).send('Invalid approver Id')
        }
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

    let employeeToBeUpdated = await Employee.findById(id);
    employeeToBeUpdated.set(req.body);
    await employeeToBeUpdated.save();
    res.send(_.pick(employeeToBeUpdated,["firstName", "secondName", "lastName", "email", "doj", "role", "approver", "gender", "password"]));
  });

router.post('/', async (req, res) => { 
    let validationResult = validate(req.body);
    if(validationResult.error) return sendValidationError(validationResult.error, res);
    
    let employee = await Employee.findOne({ email: req.body.email });
    if(employee) return res.status(400).send('User Already Registered')

    if(req.body.role !== "admin") {
        let approver
        try {
            approver = await Employee.findById(req.body.approver)
        } catch(err) {
            return res.status(400).send('Invalid Id format')
        }
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
    let mailOptionsCreate ={
        from: '"Admin LMS" lmsblock8@gmail.com', // sender address
        to: employee.email, // list of receivers
        subject: "[LOGIN DETAILS]-"+employee.firstName,
        // text: "Hello world?", // plain text body
        html: "<p>Here are your login details for LMS<br><p>"+"Login   : "+employee.email+"<br>Password : "+employee.password
    };
    em.email(mailOptionsCreate);
    res.send(_.pick(employee, ["firstName", "secondName", "lastName", "email", "doj", "role", "approver", "gender", "password"]));
})

module.exports = router