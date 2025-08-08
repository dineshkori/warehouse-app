import { Article } from "../models/Article";
import { Product } from "../models/Product";
import fs from "fs";
import path from "path";

export class WarehouseService {
  private inventory: Record<string, Article> = {};
  private products: Product[] = [];

  constructor() {
    this.loadInventory();
    this.loadProducts();
  }

  private loadInventory() {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/inventory.json"), "utf-8")
    );
    data.inventory.forEach((item: any) => {
      this.inventory[item.art_id] = {
        art_id: item.art_id,
        name: item.name,
        stock: parseInt(item.stock),
      };
    });
  }

  private loadProducts() {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8")
    );
    this.products = data.products.map((product: any) => ({
      name: product.name,
      price: parseFloat(product.price),
      contain_articles: product.contain_articles.map((a: any) => ({
        art_id: a.art_id,
        amount_of: parseInt(a.amount_of),
      })),
    }));
  }

  getAvailableProducts(): Record<string, { quantity: number; price: number }> {
    const availability: Record<string, { quantity: number; price: number }> =
      {};

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

  sellProduct(productName: string): boolean {
    const product = this.products.find((p) => p.name === productName);
    if (!product) return false;

    const availability = this.getAvailableProducts()[productName];
    if (!availability || availability.quantity < 1) return false;

    for (const article of product.contain_articles) {
      this.inventory[article.art_id].stock -= article.amount_of;
    }

    return true;
  }

  getInventory(): Record<string, Article> {
    return this.inventory;
  }
}
