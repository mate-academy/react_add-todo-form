import users from '../api/users';

export const getUserById = (userId: number) => {
  return users.find(user => user.id === userId);
};
