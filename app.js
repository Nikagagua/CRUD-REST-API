
const express = require('express')
const mongoose = require('mongoose')

const url = 'mongodb://localhost/employeesDBexpress'

const app = express()
const PORT = process.env.PORT || 8080

mongoose.connect(url , {
    useNewUrlParser: true,
})

const con = mongoose.connection
con.on('open', () => {
    console.log('connected')
})

app.use(express.json())

const employeeRouter = require('./routes/employees')
app.use('/employees', employeeRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})