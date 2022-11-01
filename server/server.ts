import express, { Request, Response } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
};

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/urls", (req: Request, res: Response) => {
  res.send(["www.one.com"]);
});

app.post("/url", (req: RequestWithBody, res: Response) => {
  const { url } = req.body;
  res.send(`Saved! ${url}`);
});

app.listen(port, () => {
  return console.log(`Node server is listening at http://localhost:${port}`);
});