"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const warehouseRoutes_1 = __importDefault(require("./routes/warehouseRoutes"));
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
const PORT = config_1.default.port || 3000;
app.use(express_1.default.json());
app.use("/warehouse", warehouseRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
