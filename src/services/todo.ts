import { Todo } from '../types';
import * as httpClient from '../utils/httpClient';

export function getTodos(userId = 11) {
  return httpClient.get<Todo[]>(`/todos?userId=${userId}`);
}

export function createTodo({ title, completed, userId }: Todo) {
  return httpClient.post<Todo>('/todos', { title, completed, userId });
}

export function updateTodo({ id, ...todoData }: Todo) {
  return httpClient.patch<Todo>(`/todos/${id}`, todoData);
}

export function deleteTodo(id: number) {
  return httpClient.remove(`/todos/${id}`);
}
