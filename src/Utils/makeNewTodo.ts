import { findUserByUserId } from './FindUserByUserId';

export const makeNewTodo = (
  id: number,
  title: string,
  userId: number,
  completed: boolean = false,
) => {
  return {
    id: id,
    title: title,
    completed: completed,
    userId: userId,
    user: findUserByUserId(userId),
  };
};

// userId,
