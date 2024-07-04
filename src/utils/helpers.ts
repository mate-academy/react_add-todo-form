import { Todo } from '../types/Todo.model';
import { User } from '../types/User.model';

export const combineTodos = (todos: Todo[], users: User[]) => {
  return todos.map(todo => {
    const author = users.find(user => user.id === todo.userId);

    return {
      ...todo,
      user: author,
    };
  });
};
