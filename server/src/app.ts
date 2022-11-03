import express, { Express, Response, Request, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import urlRoutes from "../src/routes";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/", urlRoutes);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  if (!err) {
    return next();
  }
  console.error(err.stack);
  res.status(400).send(err);
});

app.use(function (req: Request, res: Response) {
  res.status(404).send("Cannot find provided route");
});

export default app;
