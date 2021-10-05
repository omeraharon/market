const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "חסר מזהה לקוח"]
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "חסר מזהה עגלה"]
    },
    totalPrice: {
        type: Number,
        required: [true, "חסר מחיר סופי"],
        min: [0, "מחיר סופי לא יכול להיות קטן מאפס"]
    },
    city: {
        type: String,
        required: [true, "חסר רחוב למשלוח"],
        minlength: [3, "עיר לא יכולה להכיל פחות מ-3 תווים"],
        maxlength: [50, "עיר לא יכולה להכיל יותר מ-50 תווים"]
    },
    street: {
        type: String,
        required: [true, "חסר עיר למשלוח"],
        minlength: [3, "רחוב לא יכול להכיל פחות מ-3 תווים"],
        maxlength: [50, "רחוב לא יכול להכיל יותר מ-50 תווים"]
    },
    deliveryDate: {
        type: Date,
        min: new Date(Date.now()).getDate() + 1,
        required: [true, "חסר תאריך למשלוח"]
    },
    orderDate: {
        type: Date,
        required: [true, "חסר תאריך הזמנה"],
        default: Date.now
    },
    fourDigits: {
        type: String,
        minlength: [4, "שדה זה חייב להכיל 4 ספרות"],
        maxlength: [4, "שדה זה חייב להכיל 4 ספרות"],
        required: [true, "חסר 4 ספרות אחרונות של אמצעי תשלום"]
    }
}, {versionKey: false, toJSON: {virtuals: true}, id: false});

OrderSchema.virtual("customer", {
    ref: "CustomerModel",
    localField: "customerId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const OrderModel = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = OrderModel;