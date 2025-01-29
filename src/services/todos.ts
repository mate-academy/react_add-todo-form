import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';
import { Todo } from '../types/Todo';

export const todosWithUser: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  };
});
