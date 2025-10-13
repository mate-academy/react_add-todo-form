import type { Todo } from './types';

export const EMPTY_USER_ID = '';
export const ID_BASE = 0;
export const ID_INCREMENT = 1;

export const sanitizeTitle = (value: string) =>
  value.replace(/[^A-Za-zА-Яа-яІіЇїЄєҐґ0-9 ]+/g, '');

export const getNextId = (todos: Todo[]) =>
  (todos.length ? Math.max(...todos.map(t => t.id)) : ID_BASE) + ID_INCREMENT;
