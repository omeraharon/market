const express = require("express");
const cartsLogic = require("../business-logic-layer/carts-logic");
const CartModel = require("../models/cart-model");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();

router.get("/:_id", verifyLoggedIn, async (req, res) => {
    try { 
        const customerId = req.params._id;
        const cart = await cartsLogic.getLastCartAsync(customerId);
        res.json(cart);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.post("/", verifyLoggedIn, async (req, res) => {
    try {
        const cart = new CartModel(req.body);

        const errors = cart.validateSync();
        if(errors) return res.status(400).send(errors.message);

        const addedCart = await cartsLogic.addCartAsync(cart);
        res.status(201).json(addedCart);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.get("/completed/:_id", verifyLoggedIn, async (req, res) => {
    try {
        const _id = req.params._id;
        await cartsLogic.completeCartAsync(_id);
        res.sendStatus(204);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;