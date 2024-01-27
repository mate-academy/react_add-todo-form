import { PreparedTodo } from '../types';
import todosFromServer from './todos';
import Users from './users';

export function findUser(userId:number) {
  return [...Users].find(user => user.id === userId) || null;
}

export function getPreparedTodos():PreparedTodo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: findUser(todo.userId),
  }));
}
