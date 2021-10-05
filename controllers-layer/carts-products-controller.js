const express = require("express");
const cartsProductsLogic = require("../business-logic-layer/carts-products-logic");
const CartProductModel = require("../models/cart-product-model");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();

router.get("/:cartId", verifyLoggedIn, async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const cartProducts = await cartsProductsLogic.getCartProductsByCartIdAsync(cartId);
        res.json(cartProducts);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.post("/", verifyLoggedIn, async (req, res) => {
    try {
        const cartProduct = new CartProductModel(req.body);

        const errors = cartProduct.validateSync();
        if(errors) return res.status(400).send(errors.message);

        const addedCartProduct = await cartsProductsLogic.addCartProductAsync(cartProduct);
        res.status(201).json(addedCartProduct);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.delete("/:_id", verifyLoggedIn, async (req, res) => {
    try {
        const _id = req.params._id;
        await cartsProductsLogic.deleteCartProductAsync(_id);
        res.sendStatus(204);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;