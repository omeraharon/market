
const OrderModel = require("../models/order-model");
require("../data-access-layer/dal");

function getAllOrdersAsync() {
    return OrderModel.find().exec();
}

function getLastOrderAsync(customerId) {
    return OrderModel.findOne({customerId}).sort({orderDate: 'desc'}).populate("cart customer").exec();
}

function addOrderAsync(order) {
    return order.save();
}

module.exports = {
    getAllOrdersAsync,
    addOrderAsync,
    getLastOrderAsync
}