import express from "express";
import warehouseRoutes from "./routes/warehouseRoutes";
import config from "./config/config";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = config.port || 3000;

app.use(express.json());
app.use("/warehouse", warehouseRoutes);

/*
 Global Error Hanlder
*/
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
