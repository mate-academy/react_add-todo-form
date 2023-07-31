import { Todo } from '../types';
import { get, post, remove } from '../utils/httpClient';

export function getTodos(userId = 11) {
  return get<Todo[]>(`/todos?userId=${userId}`);
}

export function createTodo({ title, completed, userId }: Todo) {
  return post<Todo>('/todos', { title, completed, userId });
}

export function deleteTodo(id: number) {
  return remove(`/todos/${id}`);
}
