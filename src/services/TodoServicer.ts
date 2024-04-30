import todosFromServer from '../api/todos';

export function getNextId() {
  const nextId = Math.max(...todosFromServer.map(todo => todo.id));

  return nextId + 1;
}
