const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const employee = require('../models/employee');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employee = await Employee.find();
    if (!employee) {
      return res.status(404).json({ error: 'Employees not found' });
    }
    else if (employee.length === 0) {
      return res.status(404).json({ error: 'Employees not found' });
    }
    res.status(200).json({ message: 'Employees found', Employees: employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee found', Employee: employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new employee
router.post('/', async (req, res) => {
  try {
    const { employeeFullName, employeeEmail, employeeReport} = req.body;
    const employee = new Employee({ employeeFullName, employeeEmail, employeeReport });

    const newEmployee = await employee.save();
    res.status(201).json({ message: 'employee created', Employee: newEmployee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing employee
router.patch('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const { employeeFullName, employeeEmail, employeeReport} = req.body;
    employee.employeeFullName = employeeFullName;
    employee.employeeEmail =  employeeEmail;
    employee.employeeReport = employeeReport;

    const updateEmployee = await employee.save();
    res.status(200).json({ message: 'Employee updated', Employee: updateEmployee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an existing employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee was already removed' });
    }
    res.json({ message: 'Employee deleted', removed: employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
