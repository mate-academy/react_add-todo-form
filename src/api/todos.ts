import { Todo } from '../types/Todo';
import { users } from './users';

export const todos = [
  {
    userId: 1,
    id: 1,
    title: 'facilis inventore laboriosam omnis quo veniam',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'lorem ipsum dolor sit amet, consectetur adipis',
    completed: false,
  },
];

export const getTodos = (): Todo[] => {
  return [...todos].map(untypedTodo => {
    const untypedUser = users[untypedTodo.userId - 1] || null;

    return {
      user: {
        userId: untypedUser.id,
        fullName: untypedUser.name,
        username: untypedUser.username,
        email: untypedUser.email,
      },
      userId: untypedTodo.userId,
      todoId: untypedTodo.id,
      title: untypedTodo.title,
      completed: untypedTodo.completed,
    };
  });
};
