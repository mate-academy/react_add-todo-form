import { client } from '../utils/fetchClient';
import { Todo } from '../types/Todo';

export const getTodosByUserId = async (userId: number) => {
  const todos = await client.get<Todo[]>(`/todos?user_id=${userId}`);

  return todos || [];
};
