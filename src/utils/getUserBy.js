import usersFromServer from '../api/users';
const preparedUsers = [...usersFromServer];

export const getUserBy = todo =>
  preparedUsers.find(user => user.id === todo.userId);
