import todosFromServer from '../api/todos';
import { Todo } from '../types/Todo';
import { getUserById } from './user';

export const getTodos = (): Todo[] => {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
};

export const getNewTodoId = (todos: Todo[]): number => {
  const maxTodoId = Math.max(...todos.map(todo => todo.id));

  return maxTodoId + 1;
};
