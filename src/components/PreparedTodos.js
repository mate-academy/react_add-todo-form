import todos from '../api/todos';
import users from '../api/users';

const usersMap = {};
const usersLength = users.length;
const todosLength = todos.length;
let max = todos[0].id;

for (let i = 0; i < usersLength; i += 1) {
  usersMap[users[i].id] = users[i];
}

for (let i = 0; i < todosLength; i += 1) {
  if (max < todos[i].id) {
    max = todos[i].id;
  }
}

export const maxId = max;
export const preparedTodos = todos.map(todo => ({
  user: usersMap[todo.userId],
  ...todo,
}));
