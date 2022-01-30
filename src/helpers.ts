import users from './api/users';

export const getUserById = (userId: number) => (
  users.find(user => user.id === userId)
);
