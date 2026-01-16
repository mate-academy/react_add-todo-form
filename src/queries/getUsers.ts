import users from '../api/users';
import User from '../types/User';

export default function getUsers(): User[] {
  return users;
}
