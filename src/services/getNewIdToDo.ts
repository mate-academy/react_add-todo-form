import { ToDo } from '../type/ToDo';

export function getNewIdToDo(todos: ToDo[]) {
  const newId = Math.max(...todos.map(todo => todo.id));

  return newId + 1;
}
