import todos from '../../api/todos';

export function getTodoById(id: number) {
  return todos.filter(todo => todo.userId === id) || null;
}
