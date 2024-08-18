import { Todo, TodoWithUserInfo } from '../types/todo';
import usersFromServer from './../api/users';

export const titlePattern = /[^іІїЇєЄґҐа-яА-Яa-zA-Z0-9 ]/g;

export const getFormattedTodos = (todos: Todo[]): TodoWithUserInfo[] =>
  todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(({ id }) => id === todo.userId),
  })) as TodoWithUserInfo[];
