import todos from './todos';
import users from './users';

export const preaparedTodos = todos.map(todo => {
  const user = users.find(u => u.id === todo.userId) || null;

  return {
    ...todo,
    user,
  };
});
