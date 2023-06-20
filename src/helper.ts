import { User } from './types/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';

export function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const getTodoId = (todos: Todo[]) => {
  const todosIds = todos.map(todo => todo.id);
  const newId = Math.max(...todosIds) + 1;

  return newId;
};

export const handleChanges = (
  func: React.Dispatch<React.SetStateAction<string>>,
) => {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    func(event.target.value);
  };
};
