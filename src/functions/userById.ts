import users from '../api/users';

export const getUserById = (userId: number) => {
  const user = users.find(u => userId === u.id);

  return user;
};
