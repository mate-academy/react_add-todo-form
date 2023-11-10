import { Todo, User } from '../types/types';

export function getUserNameByUserId(
  userId: number,
  todos: Todo[],
  users: User[],
): User | undefined {
  const userTodo: Todo | undefined = todos.find(
    (todo) => todo.userId === userId,
  );

  if (!userTodo) {
    return undefined;
  }

  const user: User | undefined = users.find(
    (customer) => customer.id === userTodo.userId,
  );

  return user;
}
