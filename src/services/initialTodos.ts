import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';
import { User } from '../types/User';
import { Todo } from '../types/Todo';

export const getUserById = (userId: number): User | undefined => {
  return usersFromServer.find(user => user.id === userId);
};

export const initialTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});
