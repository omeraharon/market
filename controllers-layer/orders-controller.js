const express = require("express");
const ordersLogic = require("../business-logic-layer/orders-logic");
const OrderModel = require("../models/order-model");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const orders = await ordersLogic.getAllOrdersAsync();
        res.json(orders);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.get("/:_id", verifyLoggedIn, async (req, res) => {
    try {
        const customerId = req.params._id;
        const order = await ordersLogic.getLastOrderAsync(customerId);
        res.json(order);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.post("/", verifyLoggedIn, async (req, res) => {
    try {
        const order = new OrderModel(req.body);
        
        const errors = order.validateSync();
        if(errors) return res.status(400).send(errors.message);

        const addedOrder = await ordersLogic.addOrderAsync(order);
        res.status(201).json(addedOrder);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;