import Todo from '../types/Todo';
import User from '../types/User';
import TodoWithUser from '../types/TodoWithUser';

function findMaxTodoId(arr: TodoWithUser[]): number {
  return arr.reduce((acc, { id }) => Math.max(acc, id), 0);
}

function findMaxUserId(user: User[]): number {
  return user.reduce((acc, { id }) => Math.max(acc, id), 0);
}

function findUserById(users: User[], id: number): User | null {
  return users.find(user => id === user.id) || null;
}

function getTodosWithUsers(todos: Todo[], users: User[]): TodoWithUser[] {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
}

export { findMaxTodoId, findMaxUserId, findUserById, getTodosWithUsers };
