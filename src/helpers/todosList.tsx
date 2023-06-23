import { Todo } from '../types/Todo';
import todosFromServer from '../api/todos';
import { getUser } from './getUser';

export const todosList: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUser(todo.userId),
  };
});
