import users from '../api/users';

export const findUsedById = (todo) => {
  return users.find((user) => user.id === todo.userId);
};
