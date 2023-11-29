import todosFromServer from '../api/todos';
import { getUserById } from './getUserById';

export const visibleTodos = todosFromServer.map(todoUser => (
  {
    ...todoUser,
    user: getUserById(todoUser.userId),
  }
));
