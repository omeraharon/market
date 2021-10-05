const CategoryModel = require("../models/category-model");
const ProductModel = require("../models/product-model");
const path = require("path");
const uuid = require("uuid");
const { safeDelete } = require("../helpers/files-helper");
require("../data-access-layer/dal");

function getAllProductsAsync() {
    return ProductModel.find().exec();
}

function getAllCategoriesAsync() {
    return CategoryModel.find().exec();
}

async function addProductAsync(product, image) {
    const extension = image.name.substr(image.name.lastIndexOf("."));
    product.imageName = uuid.v4() + extension;

    const absolutePath = path.join(__dirname, "..", "images", "products", product.imageName);

    await image.mv(absolutePath);

    return product.save();
}

async function updateProductAsync(product, image) {
    if(image) {
        const previousPath = path.join(__dirname, "..", "images", "products", product.imageName);
        safeDelete(previousPath);

        const extension = image.name.substr(image.name.lastIndexOf("."));
        product.imageName = uuid.v4() + extension;
        const absolutePath = path.join(__dirname, "..", "images", "products", product.imageName);
        await image.mv(absolutePath);
    }
    
    const info = await ProductModel.updateOne({_id: product._id}, product).exec();

    return info.n ? product : null;
}



module.exports = {
    getAllProductsAsync,
    getAllCategoriesAsync,
    addProductAsync,
    updateProductAsync
}