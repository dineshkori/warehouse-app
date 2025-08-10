### Warehouse App
Aim to create production-grade Node.js application that provide API for managing warehouse inventory and product availability.

### 📦 Overview
This application loads inventory and product data from JSON files, calculates available product quantities based on current stock, and allows selling products which updates the inventory accordingly.

### Assignemt
Details of the assigment could be found in below link
[Assignment.md](Assignment.md)

### ASssumptions
- If any one of the article less less to make complete product then product will return unavailable for selling.
- Added API to get the available product, as it would be useful for getting sellable prodcut.
- No Racing conditon was considered during implementation of this solution.
- Considered "Product name" as input for product instead of Product ID as the Json only had product name

### 🚀 Features
- Load articles and products from JSON files
- Calculate available quantities of products
- Sell a product and update inventory
- RESTful API endpoints for interaction

## Future Enhancement
    - Load articles and products from No SQL DB.
    - Update of Article inventory using API.
    - Scale up the API and for concurrency checks.
    - More test automation for easy maitainability of code base.

### 📁 Project Structure
Basic structure of the project

```
warehouse-app/
├── src/
│   ├── config/
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── data/
│   ├── middleware/
│   ├── tests/
│   └── app.ts
├── package.json
├── tsconfig.json
```

### 🛠 Installation

```bash
npm install

```

### 📂 Data Files
[inventory.json](/src/data/inventory.json) & [products.json](/src/data/products.json) had to be copied to dist/data folder, for running this app properly as I am refering data from these file as sample load

- inventory.json: Contains article definitions with art_id, name, and stock.

- products.json: Contains product definitions with name, price and required articles.

### ⚙️ Build and Run
```bash
# Compile TypeScript
npm run build

# Start the server
npm start

# Run the Jest unit test case
npm test
```

### 🔌 API Endpoints
| Method | Endpoint              | Description                                                                                          |
| ------ | --------------------- | ---------------------------------------------------------------------------------------------------- |
| GET    | /warehouse/products   | Returns all products and the quantity of each that is available with the current inventory.          |
| POST   | /warehouse/sell/:name | Sells one unit of the specified product and updates the inventory. where :name is name of he product |
| GET    | /warehouse/products   | get the available products price, along with quantity available in Inventory                         |

Example:

### Sample request & Response
- Get the Inventory of with Arctile number and stock in Inventory {SERVER_URL}/warehouse/inventory

```
curl -X GET http://localhost:3000/warehouse/inventory
```

```json
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

- Get the Available products and Inventory {SERVER_URL}/warehouse/products

```
curl -X GET 'http://localhost:3000/warehouse/products'
```

```json
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

- Sell Api for product 'Dinning chair' {SERVER_URL}/warehouse/sell/Dining Chair

```
curl -X POST http://localhost:3000/warehouse/sell/Dining Chair
```

```json
{
  "message": "Product not available or not found.",
  "availability": {
    "Dining Chair": {
      "quantity": 0,
      "price": 1000
    },
    "Dinning Table": {
      "quantity": 0,
      "price": 2500
    }
  }
}
```

### ⚙️ Postman collection
PFB is the postman collection for local integration testing
[PosmanCollection](Ware_House_postman_collection.json)
