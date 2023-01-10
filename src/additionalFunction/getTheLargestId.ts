import { Todo } from '../types/todo';

export function getTheLargestId(list: Todo[]): number {
  return list
    .map(todo => todo.id)
    .sort((a, b) => b - a)[0];
}
