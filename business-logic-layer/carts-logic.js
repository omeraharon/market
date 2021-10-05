
require("../data-access-layer/dal");
const CartModel = require("../models/cart-model");

function getLastCartAsync(customerId) {
    return CartModel.findOne({customerId}).sort({dateOfCreationCart: 'desc'}).exec();
}

function addCartAsync(cart) {
    return cart.save();
}

function completeCartAsync(_id) {
    return CartModel.findByIdAndUpdate({_id}, {completed: true}).exec();
}


module.exports = {
    getLastCartAsync,
    addCartAsync,
    completeCartAsync
}