import TodoWithUser from '../types/TodoWithUser';

export default function findMaxTodoId(array: TodoWithUser[]): number {
  return array.reduce((acc, { id }) => Math.max(acc, id), 0);
}
