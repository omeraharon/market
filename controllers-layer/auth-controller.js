const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const CustomerModel = require("../models/customer-model");
const errorsHelper = require("../helpers/errors-helper");
const jwtHelper = require("../helpers/jwt-helper");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const customer = new CustomerModel(req.body);
        
        const errors = customer.validateSync();
        if(errors) return res.status(400).send(errors.message);

        const addedCustomer = await authLogic.registerAsync(customer);
        addedCustomer.token = jwtHelper.getNewToken(addedCustomer);
        res.status(201).json(addedCustomer);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).send("חסר אימייל או סיסמא");

        const loginCustomer = await authLogic.loginAsync(req.body);
        if(!loginCustomer) return res.status(400).send("אימייל או סיסמא אינם נכונים");
        loginCustomer.token = jwtHelper.getNewToken(loginCustomer);
        res.status(201).json(loginCustomer);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.post("/check", async (req, res) => { // check user email and id
    try {
        const {email, idNumber} = req.body;
        if(!email || !idNumber) return res.status(400).send("חסרים פרטים"); 
        const isExist = await authLogic.checkIdAndEmailAsync(email, idNumber);
        if(isExist) return res.status(400).send("מייל או תעודת זהות כבר קיימים במערכת");
        return res.sendStatus(204);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;