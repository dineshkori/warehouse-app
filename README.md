### Warehouse App
A production-grade Node.js application built with TypeScript and Express to manage warehouse inventory and product availability.
 
### 📦 Overview
This application loads inventory and product data from JSON files, calculates available product quantities based on current stock, and allows selling products which updates the inventory accordingly.

### 🚀 Features
- Load articles and products from JSON files
- Calculate available quantities of products
- Sell a product and update inventory
- RESTful API endpoints for interaction

### 📁 Project Structure
  ```
warehouse-app/
├── src/
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── data/
│   └── app.ts
├── package.json
├── tsconfig.json
  ```

### 🛠 Installation
```
```


### Hyper parameters
```
```
### ⚙️ Build and Run
```bash
# Compile TypeScript
npm run build

# Start the server
npm start
```

### 🔌 API Endpoints
| Method | Endpoint | Description |
| ------------------------ | ---------------------------------------------------------- | ------- |
| GET   | /warehouse/products | Returns all products and the quantity of each that is available with the current inventory.  | 

| POST   | /warehouse/sell/:name | Sells one unit of the specified product and updates the inventory.  | 



Example:

```
curl -X POST http://localhost:3000/warehouse/sell/Dining%20Chair
```



📂 Data Files
inventory.json: Contains article definitions with art_id, name, and stock.
products.json: Contains product definitions with name and required articles.