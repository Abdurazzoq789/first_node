const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = require('./category');


const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    tags: [ String ],
    category: {
        type: Schema,
        required: true
    },
    trainer: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true
    },
    fee: {
        type: Number,
        required: true
    }

});

const Course = mongoose.model('Courses',courseSchema);

function validateCourse(course){
    const Schema = {
        title: Joi.string().min(5).max(50).required(),
        categoryId: Joi.string().required(),
        status: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
        trainer: Joi.string().min(5).max(50).required(),
        fee: Joi.number().min(0)
    };

    return Joi.validate(course, Schema);
}

exports.validate = validateCourse;
exports.Course = Course;
exports.courseSchema = courseSchema;