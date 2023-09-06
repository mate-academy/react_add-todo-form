import users from '../api/users';

export function getUserById(userId: number) {
  return users.find(user => user.id === userId)
       || null;
}
