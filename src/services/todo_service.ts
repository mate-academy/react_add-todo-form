import todosFromServer from '../api/todos';

export function getNextAvailableId() {
  const nextId = Math.max(...todosFromServer.map(todo => todo.id));

  return nextId + 1;
}
