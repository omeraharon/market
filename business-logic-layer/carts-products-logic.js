
const CartProductModel = require("../models/cart-product-model");
require("../data-access-layer/dal");

function getCartProductsByCartIdAsync(cartId) {
    return CartProductModel.find({cartId}).populate("cart product").exec();
}

function addCartProductAsync(cartProduct) {
    return cartProduct.save();
}

function deleteCartProductAsync(_id) {
    return CartProductModel.deleteOne({_id}).exec();
}

module.exports = {
    getCartProductsByCartIdAsync,
    addCartProductAsync,
    deleteCartProductAsync
}