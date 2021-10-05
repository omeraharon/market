const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic");
const ProductModel = require("../models/product-model");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/categories", verifyLoggedIn, async (req, res) => {
    try {
        const categories = await productsLogic.getAllCategoriesAsync();
        res.json(categories);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.get("/", async (req, res) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        res.json(products);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.post("/", verifyAdmin, async (req, res) => {
    try {
        const image = req.files && req.files.image ? req.files.image : null;
        if(!image) return res.status(400).send("Missing image");

        const product = new ProductModel(req.body);

        const errors = product.validateSync();
        if(errors) return res.status(400).send(errors.message);

        const addedProduct = await productsLogic.addProductAsync(product, image);
        res.status(201).json(addedProduct);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.put("/:_id", verifyAdmin, async (req, res) => {
    try {
        const _id = req.params._id;
        req.body._id = _id;
        const image = req.files && req.files.image ? req.files.image : null;

        const product = new ProductModel(req.body);

        const errors = product.validateSync();
        if(errors) return res.status(400).send(errors.message);

        const updatedProduct = await productsLogic.updateProductAsync(product, image);
        if(!updatedProduct) return res.status(404).send(`id ${_id} not found`);

        res.status(201).json(updatedProduct);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.patch("/:_id", verifyAdmin, async (req, res) => {
    try {
        const _id = req.params._id;
        req.body._id = _id;
        const image = req.files && req.files.image ? req.files.image : null;

        const product = new ProductModel(req.body);

        const errors = product.validateSync();
        if(errors) return res.status(400).send(errors.message);

        const updatedProduct = await productsLogic.updateProductAsync(product, image);
        if(!updatedProduct) return res.status(404).send(`id ${_id} not found`);

        res.status(201).json(updatedProduct);
    }
    catch(err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

router.get("/images/:imageName", (req, res) => {
    try {
        const imageName = req.params.imageName;

        let absolutePath = path.join(__dirname, "..", "images", "products", imageName);
        if(!fs.existsSync(absolutePath)) absolutePath = path.join(__dirname, "..", "images", "not-found.png");
        res.sendFile(absolutePath);
    }
    catch(err) {
        res.status(500).send(err.massage);
    }
});

module.exports = router;