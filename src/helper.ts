import { Todo } from './types/Todo';
import { User } from './types/User';
import { PreparedTodo } from './types/PreparedTodo';

export function prepareTodos(
  todos: Todo[],
  users: User[],
): PreparedTodo[] {
  return todos.map((todo) => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
}
