import { type FormEventHandler } from "react";
import { useTodosStore } from "../store/todos.js";

export default function CreateTodoForm() {
  const { createTodo } = useTodosStore();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");

    if (typeof title !== "string") {
      return;
    }

    await createTodo({ title });
    form.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="new-todo">What needs to be done?</label>
      <br />
      <input id="new-todo" type="text" name="title" required />
      <button type="submit">Add Todo</button>
    </form>
  );
}
