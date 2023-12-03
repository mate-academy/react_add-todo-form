import usersFromServer from '../api/users';
import User from '../types/User';

function getUserById(userId: number) {
  return usersFromServer.find((user: User) => userId === user.id) || null;
}

export default getUserById;
