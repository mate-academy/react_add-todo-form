/* eslint-disable no-console */
import { User } from '../types/User';
import { Todo } from '../types/Todo';

const API_URL = 'https://mate.academy/students-api';

function request<T>(
  url: string,
  method = 'GET',
  data?: Partial<T>,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  return fetch(API_URL + url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Status code is ${response.status}`);
    });
}

const client = {
  get: <T>(url: string) => request<T>(url),
  delete: (url: string): Promise<void> => request(url, 'DELETE'),
  post: <T>(url: string, data: Partial<T>) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: Partial<T>) => request<T>(url, 'PATCH', data),
};

export function getUsers() {
  return client.get<User[]>('/users');
}

export function getUserById(userId: number) {
  return client.get<User>(`/users/${userId}`);
}

export function getTodos() {
  return client.get<Todo[]>('/todos?userId=68');
}

export function createTodo({ title, completed, userId }: Todo) {
  return client.post('/todos', { title, completed, userId });
}

export function deleteTodo(id: number) {
  return client.delete(`/todos/${id}`);
}

export function updateTodo({ id, ...data }: Todo) {
  return client.patch(`/todos/${id}`, data);
}
