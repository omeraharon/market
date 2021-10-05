const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "חסר שם מוצר"]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "חסר קטגוריה"]
    },
    price: {
        type: Number,
        required: [true, "חסר מחיר מוצר"],
        min: [0, "מחיר לא יכול להיות מספר שלילי"],
        max: [2000, "מחיר לא יוכל להיות גבוהה מאלפיים שקלים"]
    },
    imageName: {
        type: String,
        required: [true, "חסר שם תמונה"]
    }
}, {versionKey: false, toJSON: {virtuals: true}, id: false});

ProductSchema.virtual("category", {
    ref: "CategoryModel",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;