import users from '../api/users';
import todos from '../api/todos';

const usersMap = {};

users.forEach((user) => {
  usersMap[user.id] = { ...user };
});

export const prepareTodos = [...todos]
  .map(todo => ({
    ...todo,
    user: usersMap[todo.userId],
  }));
