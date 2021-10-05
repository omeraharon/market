const mongoose = require("mongoose");
const cryptoHelper = require("../helpers/crypto-helper");
const CustomerModel = require("../models/customer-model");
require("../data-access-layer/dal");
const jwtHelper = require("../helpers/jwt-helper");

function registerAsync(customer) {
    customer.password = cryptoHelper.hash(customer.password);
    delete customer.password;

    return customer.save();
}

function loginAsync(credentials) {
    credentials.password = cryptoHelper.hash(credentials.password);
    
    return CustomerModel.findOne({email: credentials.email, password: credentials.password});
}

function checkIdAndEmailAsync(email, idNumber) {
    return CustomerModel.findOne({ $or: [{email}, {idNumber}] });
}


module.exports = {
    registerAsync,
    loginAsync,
    checkIdAndEmailAsync
}