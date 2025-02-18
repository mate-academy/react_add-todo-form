import { Todo } from '../types/Todo';

export const getRandomId = ({ todos }: { todos: Todo[] }) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
