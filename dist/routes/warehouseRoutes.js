"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WarehouseService_1 = require("../services/WarehouseService");
const router = express_1.default.Router();
const warehouse = new WarehouseService_1.WarehouseService();
router.get("/products", (req, res) => {
    res.json(warehouse.getAvailableProducts());
});
router.post('/sell/:name', (req, res) => {
    const success = warehouse.sellProduct(req.params.name);
    if (success) {
        res.json({ message: "Product sold successfully." });
    }
    else {
        res.status(400).json({ message: "Product not available or not found." });
    }
});
router.get("/inventory", (req, res) => {
    res.json(warehouse.getInventory());
});
exports.default = router;
