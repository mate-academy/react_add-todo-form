import todos from '../api/todos';
import users from '../api/users';

export const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));
