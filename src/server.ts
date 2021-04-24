import express from "express";
import { router } from "./config/routes";
import { mongoose } from "./config/database";

const app = express();
const database = mongoose;

app.use(express.json());
app.use(router);

console.clear();

app.listen(3000, () => {
  console.log("Servidor rodando");
});
