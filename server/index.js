const mongoose = require('mongoose')
const employee = require('./routes/employee')
const auth = require('./routes/auth')
const leave = require('./routes/leave')
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
var cors = require('cors');
const serverless = require('serverless-http');

// Swagger set up
const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Time to document that Express API you built",
        version: "1.0.0",
        description:
          "A test and test project to understand how easy it is to document and Express API",
        license: {
          name: "MIT",
          url: "https://choosealicense.com/licenses/mit/"
        },
        contact: {
          name: "Swagger",
          url: "https://swagger.io",
          email: "Info@SmartBear.com"
        }
      },
      servers: [
        {
          url: "http://localhost:5000/api"
        },
        {
          url: "http://10.9.8.150:5000/api"
        },
        {
          url: "https://mg8n2x0r67.execute-api.ap-south-1.amazonaws.com/dev/api"
        },
      ]
    },
    apis: ["./models/employee.js", "./models/leaveType.js", "./models/leave.js", "./routes/employee.js", "./routes/leave.js", "./routes/auth.js"]
};
const specs = swaggerJsdoc(options);

app.use(cors());
app.use(express.json());
app.use("/api/docs", swaggerUi.serve);
app.get(
    "/api/docs",
    swaggerUi.setup(specs, {
        explorer: true
    })
);
app.use('/api/employee', employee);
app.use('/api/auth', auth);
app.use('/api/leave', leave);

//mongoose.connect('mongodb://localhost/LMS', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
mongoose.connect('mongodb+srv://lmssuperadmin:block8lms@lms-ily54.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log("Sccessfully connected to mongo db"))
    .catch((err) => console.log(`Error in connection: ${err}`))
module.exports.handler = serverless(app, {
  request: function (req, event, context) {
    context.callbackWaitsForEmptyEventLoop = false
    req.event = event
    req.context = context
  }
});
//const port = process.env.PORT || 5000;
//app.listen(port, () => console.log(`Listening to PORT ${port}...`))