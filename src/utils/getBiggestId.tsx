import { Todo } from '../Types';

export const getBiggestId = (allTodos: Todo[]): number =>
  allTodos.reduce((a, c) => (a.id > c.id ? a : c)).id;
