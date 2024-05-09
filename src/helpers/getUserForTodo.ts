import { ToDoWithoutUser } from '../types/Todos.types';
import { IUser } from '../types/User.types';

export function getTodosWithUsers(todos: ToDoWithoutUser[], users: IUser[]) {
  return todos.map(todo => ({
    ...todo,

    user: users.find(user => user.id === todo.userId) || null,
  }));
}
