import TodoWithUser from '../types/TodoWithUser';

export default function findMaxTodoId(array: TodoWithUser[]): number {
  return Math.max(...array.map(todo => todo.id));
}
