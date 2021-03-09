const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        require: true
    },
    position: {
        type: String,
        required: true
    },
    income: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Employee', EmployeeSchema);