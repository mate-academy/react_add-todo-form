import { TodoFullInfo } from '../types/todoFullInfo';
import { User } from '../types/user';
import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';

export function getTodosInfo(): TodoFullInfo[] {
  return todosFromServer
    .map(todo => {
      const todoUser: User | null = usersFromServer
        .find(user => user.id === todo.userId) || null;

      return {
        ...todo,
        user: todoUser,
      };
    });
}
