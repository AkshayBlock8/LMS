const mongoose = require('mongoose')
const employee = require('./routes/employee')
const auth = require('./routes/auth')
const leave = require('./routes/leave')
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUtils = require("./utils/swagger")
var cors = require('cors');

const specs = swaggerJsdoc(swaggerUtils.options);

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

mongoose.connect('mongodb://localhost/LMS', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
//mongoose.connect('mongodb+srv://lmsteam123:block8lms@lms-app-nqyg4.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log("Sccessfully connected to mongo db"))
    .catch((err) => console.log(`Error in connection: ${err}`))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to PORT ${port}...`))