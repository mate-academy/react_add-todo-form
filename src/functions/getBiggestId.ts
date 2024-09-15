import { Todo } from '../Types';

export const getBiggerId = (allTodos: Todo[]): number =>
  allTodos.reduce((a, c) => (a.id > c.id ? a : c)).id;
