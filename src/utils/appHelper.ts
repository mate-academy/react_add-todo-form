import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';

export const getUser = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId) ?? null;
};

export const getNewId = () => {
  return todosFromServer.reduce((acc, curr) => Math.max(acc, curr.id), 0) + 1;
};

export const getTodos = () => todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const validateTitleInput = (string: string) => {
  const regexForOnlyEnRuWords = /^[a-zA-Zа-яА-ЯёЁ\d\s]*$/;

  return regexForOnlyEnRuWords.test(string);
};
