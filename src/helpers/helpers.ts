import { Todo, User } from '../Interfaces/Interfaces';

export const generateTodoId = (todos: Todo[]) => {
  const highestId = Math.max(...todos.map(todo => todo.id));

  return highestId + 1;
};

export const getUserById = (users: User[], id: number | null) => {
  return users.find(user => user.id === id) || null;
};
