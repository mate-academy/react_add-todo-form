import usersFromServer from '../api/users';
import { Todo } from '../types/Todo';

export function preperedTodos(todos: Todo[]): Todo[] {
  return todos.map(todo => {
    const user = usersFromServer.find(({ id }) => id === todo.userId);

    return {
      ...todo,
      user,
    };
  });
}
