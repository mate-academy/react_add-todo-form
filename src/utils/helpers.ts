import { ToDo } from '../types/types';

export function creatTodoId(todos: ToDo[]) {
  const max = Math.max(...todos.map(todo => todo.id));

  return max + 1;
}
