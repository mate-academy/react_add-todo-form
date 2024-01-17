import todosFromServer from '../api/todos';
import { Todo } from '../types/Todo';
import { getUserById } from './GetUserById';

export const initialTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});
