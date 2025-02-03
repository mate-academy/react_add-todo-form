import { TODO } from '../types/TodoType';

export const getMaxId = (todos: TODO[]): number => {
  return todos.reduce((max, obj) => (obj.id > max ? obj.id : max), todos[0].id);
};
