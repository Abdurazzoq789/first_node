const express = require('express');
const router = express.Router();
const { Enrollment, validate } = require('../models/enrollment');
const { Customer } = require('../models/customer');
const { Course } = require('../models/course');
const mongoose  = require('mongoose');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const enrollments = await Enrollment.find().sort('-dateStart');
    res.send(enrollments);
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    if(!mongoose.Types.ObjectId.isValid(req.body.customerId))
        return res.status(404).send('Bu id object idmas');

    const customer = await Customer.findById(req.body.customerId);
    if(!customer)
        return res.status(404).send(`Bunaqa Id li customer topilmadi`);

    if(!mongoose.Types.ObjectId.isValid(req.body.courseId))
        return res.status(404).send('Bu id object idmas');

    const course = await Course.findById(req.body.courseId);   
    if(!course)
        return res.status(404).send(`Bunaqa Id li course topilmadi`);
    
    let enrollment = new Enrollment({
        customer:{
            _id:customer._id,
            name:customer.name
        },
        course:{
            _id:course._id,
            title:course.title
        },
        courseFee: course.fee,
    });
    if(customer.isVip)
        enrollment.courseFee = course.fee -(0.2 * course.fee);


    enrollment = await enrollment.save();

    res.status(201).send(enrollment);
});

router.get('/:id', async (req,res) => { 
    let enrollment = await Enrollment.findById(req.params.id);
    if(!enrollment)
        return res.status(404).send(`Bunaqa Id li enrollment topilmadi`);

    res.send(enrollment);
});

module.exports = router;