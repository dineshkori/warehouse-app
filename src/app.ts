import express from "express";
import warehouseRoutes from "./routes/warehouseRoutes";
import config from "./config/config";

const app = express();
const PORT = config.port || 3000;

app.use(express.json());
app.use("/warehouse", warehouseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
