import {
  MakeTodo,
  Todo,
  FindUser,
  User,
} from '../types/types';

export const makeComletedTodo: MakeTodo = (todos, users) => {
  return todos.map(todo => {
    const persons = users.filter(person => person.id === todo.userId);

    return {
      ...todo,
      user: persons[0],
    };
  });
};

export const makeNewId = (todosArrray: Todo[]): number => {
  const todoIdArray = todosArrray.map(el => el.id);

  return Math.max(...todoIdArray) + 1;
};

export const findUser: FindUser = (userList, id) => {
  const users: User [] = userList.filter(us => us.id === id);

  return users[0];
};
