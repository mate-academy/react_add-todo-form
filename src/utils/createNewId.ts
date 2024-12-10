import { Todo } from '../types';

export function createNewId(todos: Todo[]) {
  const arrayOfIds = todos.reduce((acc: number[], todo: Todo) => {
    acc.push(todo.id);

    return acc;
  }, []);

  return Math.max(...arrayOfIds) + 1;
}
