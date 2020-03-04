const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Time to document that Express API you built",
        version: "1.0.0",
        description:
          "A test project to understand how easy it is to document and Express API",
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

module.exports.options = swaggerOptions