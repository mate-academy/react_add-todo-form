import { TodoWithUser, Todos, Users } from './components/types';

const getUserById = (users: Users[], id:number) => {
  return users.find(user => user.id === id);
};

export const getUsersTodos = (todos:Todos[], users:Users[]):TodoWithUser[] => {
  return todos.map(todo => (
    { ...todo, user: getUserById(users, todo.userId) }));
};

export const setNextId = (usersTodos:TodoWithUser[]):number => {
  const allIds = usersTodos.map(userTodo => userTodo.id);

  return Math.max(...allIds) + 1;
};
