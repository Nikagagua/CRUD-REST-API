const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeesSchema = new Schema({
    employeeFullName: {
        type: String,
        required: true
    },
    employeeEmail: {
        type: String,
        required: true
    },
    employeeReport: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    versionKey: false
}
);

module.exports = mongoose.model('employees', employeesSchema);

