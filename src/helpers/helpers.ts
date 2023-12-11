import {
  MakeTodo,
  Todo,
  FindUser,
} from '../types/types';

export const getTodosWithUser: MakeTodo = (todos, users) => {
  return todos.map(todo => {
    const user = users.find(({ id }) => id === todo.userId) || null;

    return {
      ...todo,
      user,
    };
  });
};

export const makeNewId = (todos: Todo[]): number => {
  const todoIds = todos.map(todo => todo.id);

  return Math.max(...todoIds) + 1;
};

export const findUser: FindUser = (userList, id) => {
  return userList.find(us => us.id === id) || null;
};
