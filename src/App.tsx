import CreateTodoForm from "./components/CreateTodoForm.js";
import TodoList from "./components/TodoList.js";
import { TodosStoreProvider } from "./store/todos.js";

export default function App() {
  return (
    <TodosStoreProvider>
      <TodoList />
      <CreateTodoForm />
    </TodosStoreProvider>
  );
}
