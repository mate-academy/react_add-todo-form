import { ToDo, ToDoWithusers, User } from './types/types';

export function getUsetById(users: User[], id: number): User | null {
  return users.find(user => user.id === id) || null;
}

export function getToDosWithUsers(
  todos: ToDo[],
  users: User[],
): ToDoWithusers[] {
  return todos.map(todo => {
    return {
      ...todo,
      user: getUsetById(users, todo.userId),
    };
  });
}

export function createIdForTodo(todos: ToDo[]): number {
  if (todos.length === 0) {
    return 1;
  }

  const arrId: number[] = todos.map(todo => todo.id);

  return Math.max(...arrId) + 1;
}
