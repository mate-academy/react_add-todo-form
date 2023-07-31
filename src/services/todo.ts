import { Todo } from '../types';
import { httpClient } from '../utils/httpClient';

export function getTodos(userId = 11) {
  return httpClient.get<Todo[]>(`/todos?userId=${userId}`);
}
