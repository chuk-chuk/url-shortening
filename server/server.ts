import * as dotenv from "dotenv";
import { connectToDatabase } from "./src/database";
import app from "./src/app";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10) || 6060;

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Node server is running on port: ${PORT}`);
});
