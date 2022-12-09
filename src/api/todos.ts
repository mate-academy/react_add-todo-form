import { client } from '../utils/fetchClient';
import { Todo } from '../types/Todo';

export const getTodosByUserId = async (userId: number) => {
  const todos = await client.get<Todo[]>(`/todos?user_id=${userId}`);

  return todos || [];
};

export const addTodo = async (todo: Omit<Todo, 'id'>) => {
  const newTodo = await client.post<Todo>('/todos', todo);

  return newTodo;
};

export const removeTodo = async (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
