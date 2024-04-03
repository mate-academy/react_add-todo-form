import usersFromServer from '../api/users';
import { Todos, Users } from '../components/types';

export const findIdUser = (post: Todos) => {
  return usersFromServer.find((user: Users) => post.userId === user.id);
};
