import users from './api/users';
import { Todo } from './types';

export const getUserName = (userId:number) => {
  const user = users.find(person => person.id === userId);

  return user ? user.name : 'No user';
};

export const prepareTodos = (todos:Todo[]) => (
  todos.map(todo => ({
    ...todo,
    userName: getUserName(todo.userId),
  }))
);
