import todosFromServer from '../api/todos';

import { getUser } from './getUser';

import { Todo } from '../types/Todo';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));
