import { Todo, TodoWithUser } from '../types/todo';
import usersFromServer from './../api/users';

export const titleCharsWhiteList = /[^іІїЇєЄґҐа-яА-Яa-zA-Z0-9 ]/g;

export const getPreparedTodos = (todos: Todo[]): TodoWithUser[] =>
  todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(({ id }) => id === todo.userId),
  })) as TodoWithUser[];
