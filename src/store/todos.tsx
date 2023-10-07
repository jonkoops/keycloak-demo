import { useState, type PropsWithChildren } from "react";
import * as api from "../api/todos.js";
import { type NewTodo, type Todo } from "../api/todos.js";
import { createNamedContext } from "../utils/createNamedContext.js";
import { usePromise } from "../utils/usePromise.js";
import { useRequiredContext } from "../utils/useRequiredContext.js";

export interface TodosStoreProps {
  todos: Todo[];
  createTodo: (todo: NewTodo) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (todo: Todo) => Promise<void>;
}

export const TodosStoreContext = createNamedContext<
  TodosStoreProps | undefined
>("TodoStoreContext", undefined);

export const TodosStoreProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  usePromise(api.getTodos, setTodos, []);

  async function createTodo(todo: NewTodo) {
    const createdTodo = await api.createTodo(todo);
    setTodos((todos) => [...todos, createdTodo]);
  }

  async function updateTodo(todo: Todo) {
    const updatedTodo = await api.updateTodo(todo);
    setTodos((todos) =>
      todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
  }

  async function deleteTodo(todo: Todo) {
    await api.deleteTodo(todo);
    setTodos((todos) => todos.filter((t) => t.id !== todo.id));
  }

  return (
    <TodosStoreContext.Provider
      value={{ todos, createTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodosStoreContext.Provider>
  );
};

export const useTodosStore = () => useRequiredContext(TodosStoreContext);
