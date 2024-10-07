import { findUserByUserId } from './FindUserByUserId';
import { User } from '../Types/user';

export const makeNewTodo = (
  id: number,
  title: string,
  userId: number,
  userList: User[],
  completed: boolean = false,
) => {
  return {
    id: id,
    title: title,
    completed: completed,
    userId: userId,
    user: findUserByUserId(userId, userList),
  };
};

// userId,
