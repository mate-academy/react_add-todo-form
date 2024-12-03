import { Todo } from '../Types/todoInterface';

export const getNewTodoId = (todoList: Todo[]) => {
  return Math.max(...todoList.map(todo => todo.id)) + 1;
};
