import todosFromServer from '../api/todos';
import { getUserById } from './getUserById';

export const preparedTodos = () => {
  return (
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    }))
  );
};
