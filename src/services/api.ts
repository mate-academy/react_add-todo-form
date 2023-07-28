import { Todo, User } from '../types';

const API_URL = 'https://mate.academy/students-api';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function get<T>(endpoint: string): Promise<T> {
  await wait(500);
  const response = await fetch(API_URL + endpoint);

  if (!response.ok) {
    throw new Error(`Can't load from '${endpoint}'`);
  }

  return response.json();
}

async function post<T>(endpoint: string, data: any): Promise<T> {
  await wait(500);

  const response = await fetch(API_URL + endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  if (!response.ok) {
    throw new Error(`Can't load from '${endpoint}'`);
  }

  return response.json();
}

export function getTodos(userId = 11) {
  return get<Todo[]>(`/todos?userId=${userId}`);
}

export function createTodo({ title, completed, userId }: Todo) {
  return post<Todo>('/todos', { title, completed, userId });
}

export function getUsers(): Promise<User[]> {
  return get<User[]>('/users')
    .then(users => users.slice(0, 11));
}

export function getUserById(id: number): Promise<User> {
  return get<User>(`/users/${id}`);
}
