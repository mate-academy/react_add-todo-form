import { Todo } from '../components/Types/interfaces';

export const getNewTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
