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

| Method | Endpoint              | Description                                                                                          |
| ------ | --------------------- | ---------------------------------------------------------------------------------------------------- |
| GET    | /warehouse/products   | Returns all products and the quantity of each that is available with the current inventory.          |
| POST   | /warehouse/sell/:name | Sells one unit of the specified product and updates the inventory. where :name is name of he product |
| GET    | /warehouse/products   | get the available products price, along with quantity available in Inventory                         |

Example:


### Sample request & Response
```json

Get the Inventory of with Arctile number and stock in Inventory

curl -X GET http://localhost:3000/warehouse/inventory


{
    "1": {
        "art_id": "1",
        "name": "leg",
        "stock": 12
    },
    "2": {
        "art_id": "2",
        "name": "screw",
        "stock": 17
    },
    "3": {
        "art_id": "3",
        "name": "seat",
        "stock": 2
    },
    "4": {
        "art_id": "4",
        "name": "table top",
        "stock": 1
    }
}
```

```json
/warehouse/products 

Get the Available products and Inventory

curl -X GET 'http://localhost:3000/warehouse/products'

{
    "Dining Chair": {
        "quantity": 2,
        "price": 1000
    },
    "Dinning Table": {
        "quantity": 1,
        "price": 2500
    }
}

```

```json
/warehouse/sell/Dining Chair

Sell Api for product 'Dinning chair'


http://localhost:3000/warehouse/sell/Dining Chair

{
    "message": "Product sold successfully."
}

```


📂 Data Files
inventory.json: Contains article definitions with art_id, name, and stock.
products.json: Contains product definitions with name and required articles.
