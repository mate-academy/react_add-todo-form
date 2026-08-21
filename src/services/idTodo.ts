import { Todo } from '../types/Todo';

export function getNewTodoId(todos: Todo[]) {
  const maxIdTodo = Math.max(...todos.map(todo => todo.id));

  return maxIdTodo + 1;
}
