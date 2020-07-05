import todos from '../api/todos';
import users from '../api/users';

const usersMap = {};
const usersLength = users.length;

for (let i = 0; i < usersLength; i += 1) {
  usersMap[users[i].id] = users[i];
}

export const preparedTodos = todos.map(todo => ({
  user: usersMap[todo.userId],
  ...todo,
}));
