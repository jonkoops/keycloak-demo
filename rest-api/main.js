import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./db.js";
import { protect } from "./protect.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/todos", protect("view-todos"), async (req, res) => {
  res.json(getTodos());
});

app.post("/todos", protect("create-todos"), (req, res) => {
  res.json(createTodo(req.body));
});

app.patch("/todos/:id", protect("update-todos"), (req, res) => {
  res.json(updateTodo(req.params.id, req.body));
});

app.delete("/todos/:id", protect("delete-todos"), (req, res) => {
  res.json(deleteTodo(req.params.id));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

