import express, { Express } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectToDatabase } from "./src/database";
import urlRoutes from "./src/routes";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 6060;
const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

/** Routes */
app.use("/", urlRoutes);

/** Error handling */

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Node server is running on port: ${PORT}`);
});