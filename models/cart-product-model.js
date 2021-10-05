const mongoose = require("mongoose");

const CartProductSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "חסר מזהה מוצר"]
    },
    quantity: {
        type: Number,
        required: [true, "חסר כמות"],
        min: [1, "כמות לא יכולה להכיל פחות ממוצר אחד"],
        max: [100, "כמות לא יכולה להכיל יותר ממאה מוצרים"]
    },
    totalPrice: {
        type: Number,
        required: [true, "חסר מחיר כללי"],
        min: [0, "מחיר כללי לא יכול להיות קטן מאפס"],
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "חסר מזהה עגלה"]
    }
}, {versionKey: false, toJSON: {virtuals: true}, id: false});

CartProductSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

CartProductSchema.virtual("product", {
    ref: "ProductModel",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

const CartProductModel = mongoose.model("CartProductModel", CartProductSchema, "cartsProducts");

module.exports = CartProductModel;