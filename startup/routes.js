const express = require('express');
const errorMiddleware = require('../middleware/error');
const category = require('../routes/category');
const customersRoute = require('../routes/customers');
const coursesRoute = require('../routes/courses');
const enrollmentsRoute = require('../routes/enrollments');
const usersRoute = require('../routes/users');
const authRoute = require('../routes/auth');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/categories', category);
    app.use('/api/customers', customersRoute);
    app.use('/api/courses', coursesRoute);
    app.use('/api/enrollments', enrollmentsRoute);
    app.use('/api/users', usersRoute);
    app.use('/api/auth', authRoute);
    app.use(errorMiddleware);
}