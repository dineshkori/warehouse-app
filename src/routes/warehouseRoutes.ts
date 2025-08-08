import express from "express";
import { WarehouseService } from "../services/WarehouseService";

const router = express.Router();
const warehouse = new WarehouseService();

router.get("/products", (req, res) => {
  res.json(warehouse.getAvailableProducts());
});

router.post("/sell/:name", (req, res) => {
  const success = warehouse.sellProduct(req.params.name);
  if (success) {
    res.json({
      message: "Product sold successfully.",
      availability: warehouse.getAvailableProducts(),
    });
  } else {
    res.status(400).json({
      message: "Product not available or not found.",
      availability: warehouse.getAvailableProducts(),
    });
  }
});

router.get("/inventory", (req, res) => {
  res.json(warehouse.getInventory());
});

export default router;
