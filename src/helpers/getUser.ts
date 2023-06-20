import { User } from '../Types';

export const getUser = (
  id: number, users: User[],
) => (
  users.find(currentUser => currentUser.id === id)
);
