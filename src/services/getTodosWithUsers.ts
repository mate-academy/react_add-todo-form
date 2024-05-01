import Todo from '../types/Todo';
import TodoWithUser from '../types/TodoWithUser';
import User from '../types/User';

export default function getTodosWithUsers(
  todos: Todo[],
  users: User[],
): TodoWithUser[] {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
}
