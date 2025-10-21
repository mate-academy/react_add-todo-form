import { Todo } from './Todo';
import { User } from './User';

export const createTodoAggregates = (todos: Todo[], users: User[]): Todo[] => {
  return todos.map(todo => ({
    ...todo,
    user: todo.user ?? (users.find(u => u.id === todo.userId) || null),
  }));
};
