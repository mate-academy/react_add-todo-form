import { Todo } from '../types';

export const currentMaxId = (todos: Todo[]) => Math.max(...todos
  .map(todo => todo.id));

export const formatedTitle = (title: string) => {
  return title.replace(/[^a-zA-Za-яA-Я ]/g, '');
};
