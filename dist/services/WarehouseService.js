"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class WarehouseService {
    constructor() {
        this.inventory = {};
        this.products = [];
        this.loadInventory();
        this.loadProducts();
    }
    loadInventory() {
        const data = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../data/inventory.json"), "utf-8"));
        data.inventory.forEach((item) => {
            this.inventory[item.art_id] = {
                art_id: item.art_id,
                name: item.name,
                stock: parseInt(item.stock),
            };
        });
    }
    loadProducts() {
        const data = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../data/products.json"), "utf-8"));
        this.products = data.products.map((product) => ({
            name: product.name,
            price: parseFloat(product.price),
            contain_articles: product.contain_articles.map((a) => ({
                art_id: a.art_id,
                amount_of: parseInt(a.amount_of),
            })),
        }));
    }
    getAvailableProducts() {
        const availability = {};
        for (const product of this.products) {
            let minQty = Infinity;
            for (const article of product.contain_articles) {
                const inv = this.inventory[article.art_id];
                if (!inv) {
                    minQty = 0;
                    break;
                }
                const available = Math.floor(inv.stock / article.amount_of);
                minQty = Math.min(minQty, available);
            }
            availability[product.name] = {
                quantity: minQty,
                price: product.price, // assuming product has a `price` field
            };
        }
        return availability;
    }
    sellProduct(productName) {
        const product = this.products.find((p) => p.name === productName);
        if (!product)
            return false;
        const availability = this.getAvailableProducts()[productName];
        if (!availability || availability.quantity < 1)
            return false;
        for (const article of product.contain_articles) {
            this.inventory[article.art_id].stock -= article.amount_of;
        }
        return true;
    }
    /*
    getAvailableProducts(): Record<string, number> {
      const availability: Record<string, number> = {};
      for (const product of this.products) {
        let minQty = Infinity;
        for (const article of product.contain_articles) {
          const inv = this.inventory[article.art_id];
          if (!inv) {
            minQty = 0;
            break;
          }
          const available = Math.floor(inv.stock / article.amount_of);
          minQty = Math.min(minQty, available);
        }
        availability[product.name] = minQty;
      }
      return availability;
    }
  
    sellProduct(productName: string): boolean {
      const product = this.products.find((p) => p.name === productName);
      if (!product) return false;
  
      const available = this.getAvailableProducts()[productName];
      if (available < 1) return false;
  
      for (const article of product.contain_articles) {
        this.inventory[article.art_id].stock -= article.amount_of;
      }
      return true;
    }
  */
    getInventory() {
        return this.inventory;
    }
}
exports.WarehouseService = WarehouseService;
