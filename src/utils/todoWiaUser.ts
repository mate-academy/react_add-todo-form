import todosFromServer from '../api/todos';
import { findUser } from './userFind';

export const todosWiaUser = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));
