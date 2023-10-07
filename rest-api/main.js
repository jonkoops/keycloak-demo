import express from "express";
import { randomUUID } from "node:crypto";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./db.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/todos", (req, res) => {
  res.json(getTodos());
});

app.post("/todos", (req, res) => {
  res.json(createTodo(req.body));
});

app.patch("/todos/:id", (req, res) => {
  res.json(updateTodo(req.params.id, req.body));
});

app.delete("/todos/:id", (req, res) => {
  res.json(deleteTodo(req.params.id));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

