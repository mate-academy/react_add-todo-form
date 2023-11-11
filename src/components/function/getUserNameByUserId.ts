import { Todo, User } from '../types/types';

export function getUserNameByUserId(
  userId: number,
  todos: Todo[],
  users: User[],
): User | null {
  const userTodo: Todo | undefined = todos.find(
    (todo) => todo.userId === userId,
  );

  if (!userTodo) {
    return null;
  }

  const user: User | undefined = users.find(
    (customer) => customer.id === userTodo.userId,
  );

  return user as User;
}
