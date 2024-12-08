import { Todo } from '../types/Todo';
import usersFromServer from '../api/users';

export function getPreperedTodos(todos: Todo[]) {
  return todos.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    return { ...todo, user };
  });
}
