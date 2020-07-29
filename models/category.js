const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    }  
});

const Category = mongoose.model('Category',categorySchema);

function validateCategories(categories){
    const categoriesSchem = {
        name: Joi.string().min(3).max(50).required()
    }

    return Joi.validate(categories, categoriesSchem);
}

exports.Category = Category;
exports.validate = validateCategories;
exports.Schema = categorySchema;