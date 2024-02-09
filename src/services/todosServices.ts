import { Todo } from '../types/Todo';

export default function getMaxTodosId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id));
}
