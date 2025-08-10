import { WarehouseService } from "../services/WarehouseService";
import { Article } from "../models/Article";
import { Product } from "../models/Product";
import fs from "fs";
import path from "path";

// Mock fs.readFileSync
jest.mock("fs");

const mockInventoryData = {
  inventory: [
    { art_id: "1", name: "leg", stock: "12" },
    { art_id: "2", name: "seat", stock: "5" },
  ],
};

const mockProductData = {
  products: [
    {
      name: "Chair",
      price: "499.00",
      contain_articles: [
        { art_id: "1", amount_of: "4" },
        { art_id: "2", amount_of: "1" },
      ],
    },
  ],
};

describe("WarehouseService", () => {
  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath.includes("inventory.json")) {
        return JSON.stringify(mockInventoryData);
      } else if (filePath.includes("products.json")) {
        return JSON.stringify(mockProductData);
      }
    });
  });

  it("should load inventory and products correctly", () => {
    const service = new WarehouseService();
    const inventory = service.getInventory();
    expect(inventory["1"].name).toBe("leg");
    expect(inventory["2"].stock).toBe(5);
  });

  it("should return correct available products", () => {
    const service = new WarehouseService();
    const available = service.getAvailableProducts();
    expect(available["Chair"]).toEqual({ quantity: 3, price: 499.0 });
  });

  it("should sell a product and update inventory", () => {
    const service = new WarehouseService();
    const result = service.sellProduct("Chair");
    expect(result).toBe(true);

    const inventory = service.getInventory();
    expect(inventory["1"].stock).toBe(8); // 12 - 4
    expect(inventory["2"].stock).toBe(4); // 5 - 1
  });

  it("should not sell a product if not enough stock", () => {
    const service = new WarehouseService();

    // Sell 3 chairs to exhaust inventory
    service.sellProduct("Chair");
    service.sellProduct("Chair");
    service.sellProduct("Chair");

    const result = service.sellProduct("Chair");
    expect(result).toBe(false);
  });

  it("should return false for non-existent product", () => {
    const service = new WarehouseService();
    const result = service.sellProduct("Table");
    expect(result).toBe(false);
  });
});
