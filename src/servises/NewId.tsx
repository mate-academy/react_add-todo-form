import { Todo } from '../Type/todos';

export function getNewId(todos: Todo[]) {
  const newId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return newId + 1;
}
