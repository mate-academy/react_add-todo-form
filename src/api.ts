import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate.academy/students-api';

// This function creates a promise
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url;

  // we add some delay to see how the loader works
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export function post<T>(
  url: string, data: any = {}, method: string,
): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url;

  // we add some delay to see how the loader works
  return fetch(fullURL, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then(res => res.json());
}

export function getTodos() {
  return get<Todo[]>('/todos');
}

export function getUsers() {
  return get<User[]>('/users')
    .then((users) => users.slice(0, 11));
}

export function createTodo({ title, completed, userId }: Todo) {
  return post<Todo>('/todos', { title, completed, userId }, 'POST');
}

export function updateTodo(id: number, data: Partial<Todo>) {
  return post<Todo>(`/todos/${id}`, data, 'PATCH');
}

export function deleteTodo(id: number) {
  return post<Todo>(`/todos/${id}`, {}, 'DELETE');
}
