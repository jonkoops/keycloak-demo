import { randomUUID } from "node:crypto";
import initialValue from "./data/todos.json" assert { type: "json" };

let todos = initialValue;

export function getTodos() {
  return todos;
}

export function createTodo(values) {
  const id = randomUUID();
  const todo = patchTodo({ id, title: "", isCompleted: false }, values);

  todos.push(todo);

  return todo;
}

export function updateTodo(id, values) {
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return;
  }

  return patchTodo(todo, values);
}

export function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
}

function patchTodo(todo, { title, isCompleted }) {
  todo.title = typeof title === "string" ? title : "";
  todo.isCompleted = typeof isCompleted === "boolean" ? isCompleted : false;

  return todo;
}
