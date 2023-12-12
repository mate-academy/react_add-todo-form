import { todosFromServer } from '../api';
import { Todo } from '../types';
import { getUser } from './getUser';

export const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));
