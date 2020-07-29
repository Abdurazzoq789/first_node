const Joi = require('joi');
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
});

const Customer = mongoose.model('Customer',customerSchema);

function validateCustomer(customer){
    const Schema = {
        name: Joi.string().min(5).max(50).required(),
        isVip: Joi.boolean().required(),
        phone: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(customer, Schema);
}

exports.validate = validateCustomer;
exports.Customer = Customer;
exports.customerSchema = customerSchema;