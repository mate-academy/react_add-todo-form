import usersFromServer from '../api/users';
import { TodoWUser } from '../types/TodoWUser';

export function preparedTodos(todos: TodoWUser[]): TodoWUser[] {
  return todos.map(todo => {
    const user = usersFromServer.find((u) => u.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });
}
