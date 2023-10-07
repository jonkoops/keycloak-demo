export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export type NewTodo = Pick<Todo, "title">;

export function getTodos(): Promise<Todo[]> {
  return fetchJson<Todo[]>("/api/todos");
}

export function createTodo(todo: NewTodo): Promise<Todo> {
  return fetchJson<Todo>("/api/todos", { method: "POST", body: JSON.stringify(todo) });
}

export function updateTodo({ id, ...todo }: Todo): Promise<Todo> {
  return fetchJson<Todo>(`/api/todos/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(todo) });
}

export async function deleteTodo(todo: Todo): Promise<void> {
  await fetchWithError(`/api/todos/${encodeURIComponent(todo.id)}`, { method: "DELETE" });
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  if (init?.body) {
    const headers = new Headers(init.headers);
    headers.set("Content-Type", "application/json; charset=utf-8");
    init.headers = headers;
  }

  const response = await fetchWithError(url, init);
  return response.json();
}

async function fetchWithError(url: string, init?: RequestInit) {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error("Response is not ok");
  }

  return response;
}