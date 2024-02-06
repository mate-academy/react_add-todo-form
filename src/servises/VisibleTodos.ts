import { Todo } from '../types/Todo';
import { User } from '../types/User';

export const getVisibleToDos = (users: User[], todos: Todo[]): Todo[] => {
  return todos.map(todo => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId) || null,
    };
  });
};
