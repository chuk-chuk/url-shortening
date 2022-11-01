import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3001, () => {
  console.log("Server is listening on http://localhost:3001");
});