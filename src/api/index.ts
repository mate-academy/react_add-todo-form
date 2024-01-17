import usersFromServer from './users';
import todosFromServer from './todos';
import { User } from '../types/User';
import { Todo } from '../types/Todo';
import { PreparedTodo } from '../types/PreparedTodo';

export function findUser(userId: number): User {
  return [...usersFromServer].find(user => user.id === userId) as User;
}

export function findTodo(userId: number): Todo[] {
  return [...todosFromServer].filter(todo => todo.userId === userId);
}

export function getPreparedTodos(): PreparedTodo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: findUser(todo.userId),

  }));
}
