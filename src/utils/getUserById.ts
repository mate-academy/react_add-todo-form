import usersFromServer from '../api/users';

export default function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}
