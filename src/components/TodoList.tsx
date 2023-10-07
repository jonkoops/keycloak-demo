import { type Todo } from "../api/todos.js";
import { useTodosStore } from "../store/todos.js";
import { TodoListItem } from "./TodoListItem.js";

export default function TodoList() {
  const { todos, updateTodo, deleteTodo } = useTodosStore();

  function onComplete(todo: Todo) {
    updateTodo({ ...todo, isCompleted: true });
  }

  function onDelete(todo: Todo) {
    deleteTodo(todo);
  }

  if (todos.length === 0) {
    return <p>No tasks remaining, yay! 🎉</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
