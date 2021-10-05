global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");

const authController = require("./controllers-layer/auth-controller");
const productsController = require("./controllers-layer/products-controller");
const cartsController = require("./controllers-layer/carts-controller");
const cartsProductsController = require("./controllers-layer/carts-products-controller");
const ordersController = require("./controllers-layer/orders-controller");

const fileUpload = require("express-fileupload");

const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload());

server.use("/api/auth", authController);
server.use("/api/products", productsController);
server.use("/api/carts", cartsController);
server.use("/api/cart-products", cartsProductsController);
server.use("/api/orders", ordersController);

server.use("*", (req, res) => res.status(404).send("Route not found"));

server.listen(3001, () => console.log("Listening..."));
