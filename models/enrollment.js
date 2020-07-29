const Joi = require('joi');
const mongoose = require('mongoose');

const Enrollment = mongoose.model('Enrollment', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            }
        }),
        required: true
    },
    course: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    dateStart: {
        type: Date,
        default: Date.now,
        required: true
    },
    courseFee: {
        type: Number,
        min: 0 
    },
}));

function validateEnrollment(enrollment){
    const Schema = {
        customerId: Joi.string().required(),
        courseId: Joi.string().required(),
    };

    return Joi.validate(enrollment, Schema);
}

exports.validate = validateEnrollment;
exports.Enrollment = Enrollment;