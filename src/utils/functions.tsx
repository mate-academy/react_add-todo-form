import { Todo } from '../types/todo';
import { User } from '../types/user';

export function findUser(userId: number, usersArray: User[]): User | null {
  return usersArray.find(user => user.id === userId) || null;
}

export function findTodoId(todosArray: Todo[]) {
  return todosArray.reduce(
    (max: number, todo: Todo) => (todo.id > max ? todo.id : max),
    0,
  );
}
