const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors');
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useNewUrlParser', true);

const bodyParser = require('body-parser');
require('dotenv/config');

// app.use(cors());
app.use(bodyParser.json());


const employeesRoute = require('./routes/employees');
const usersRoute = require('./routes/users');
app.use('/employees', employeesRoute);
app.use('/', usersRoute);


mongoose.connect(process.env.DB_CONNECTION, () => console.log("connected to DB"));

app.listen(process.env.PORT || 5000);