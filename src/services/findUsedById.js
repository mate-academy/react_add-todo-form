import users from '../api/users';

export const findUsedById = (id) => {
  return users.find((user) => user.id === id);
};
