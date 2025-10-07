import { Todo } from './types';

export const createTodo = (
  title: string,
  userId: number,
  todosList: Todo[],
): Todo => {
  const newId =
    todosList.length > 0 ? Math.max(...todosList.map(t => t.id)) + 1 : 1;

  return {
    id: newId,
    title,
    completed: false,
    userId,
  };
};
