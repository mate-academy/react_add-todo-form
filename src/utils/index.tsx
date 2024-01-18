import { Todo } from '../types/Todo';
import { TodoWithUser } from '../types/TodoWithUser';
import { User } from '../types/Users';

export const findUserById
  = (users: User[], id: number) => users.find(u => u.id === id) || null;

export const getPreparedData
  = (todos: Todo[], users: User[]): TodoWithUser[] => {
    return todos.map(todo => {
      const user = users.find(u => u.id === todo.userId) || null;

      return { ...todo, user };
    });
  };
