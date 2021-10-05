const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
    firstName: {
        type: String,
        minlength: [2, "שם פרטי אינו יכול להכיל פחות מתו אחד"],
        maxlength: [50, "שם פרטי אינו יכול להכיל יותר מ-50 אותיות"],
        match: [/^[a-zא-ת]+(?:[\s-][a-zא-ת]+)*$/, "שם פרטי אינו תקין"],
        required: [true, "חסר שם פרטי"]
    },
    lastName: {
        type: String,
        required: [true, "חסר שם משפחה"],
        minlength: [2, "שם משפחה אינו יכול להכיל פחות מ-2 אותיות"],
        maxlength: [50, "שם משפחה אינו יכול להכיל יותר מ-50 אותיות"],
        match: [/^[a-zא-ת]+(?:[\s-][a-zא-ת]+)*$/, "שם משפחה אינו תקין"]
    },
    email: {
        type: String,
        required: [true, "חסר אימייל2222222222222222"],
        unique: [true, "אימייל קיים 1111111111111111במערכת"],
        trim: true,
        lowercase: true,
        match: [/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+''))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "אנא הכנס אימייל חוקי"]
    },
    idNumber: {
        type: String,
        required: [true, "חסר תעודת זהות"],
        unique: [true, "תעודת זהות זאת קיימת במערכת"],
        match: [/^\d{9}$/, "תעודת זהות אינה חוקית"]
    },
    password: {
        type: String,
        required: [true, "חסרה סיסמא"],
        minlength: [3, "סיסמא לא יכולה להכיל פחות מ-3 תווים"],
        maxlength: [200, "סיסמא לא יכולה להכיל יותר מ-40 תווים"]
    },
    city: {
        type: String,
        minlength: [3, "עיר לא יכולה להכיל פחות מ-3 תווים"],
        maxlength: [50, "עיר לא יכולה להכיל יותר מ-50 תווים"],
        match: [/^[a-zא-ת]+(?:[\s-][a-zא-ת]+)*$/, "שם עיר אינו תקין"]
    },
    street: {
        type: String,
        minlength: [3, "רחוב לא יכול להכיל פחות מ-3 תווים"],
        maxlength: [50, "רחוב לא יכול להכיל יותר מ-50 תווים"],
        match: [/^[a-zא-ת]+(?:[\s-][a-zא-ת0-9]+)*$/, "רחוב אינו תקין"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    token: {
        type: String
    }

}, {versionKey: false});

const CustomerModel = mongoose.model("CustomerModel", CustomerSchema, "customers");

module.exports = CustomerModel;