import { Todo } from '../types/Todo';

export const getNewId
  = (todos: Todo[]) => Math.max(...todos.map(todo => todo.id)) + 1;

export const filterTitle = (title: string) => {
  const filterPattern = /[a-zA-Zа-яА-Я0-9 ]/;

  return title.split('')
    .filter(char => filterPattern.test(char))
    .join('');
};
