import classNames from "classnames";
import { type Todo } from "../api/todos.js";

export interface TodoListItemProps {
  todo: Todo;
  onComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export function TodoListItem({
  todo,
  onComplete,
  onDelete,
}: TodoListItemProps) {
  return (
    <li
      className={classNames("todo-list-item", {
        "todo-list-item--completed": todo.isCompleted,
      })}
    >
      <span className="todo-list-item__title">{todo.title}</span>&nbsp;
      {!todo.isCompleted && (
        <>
          <button
            type="button"
            aria-label="Mark as completed"
            onClick={() => onComplete(todo)}
          >
            ✅
          </button>
          &nbsp;
        </>
      )}
      <button type="button" aria-label="Delete" onClick={() => onDelete(todo)}>
        🗑️
      </button>
    </li>
  );
}
