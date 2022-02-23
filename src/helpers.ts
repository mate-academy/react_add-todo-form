import todos from './api/todos';
import users from './api/users';

export const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id) || null,
}));

export const newId = (items: Todo[]) => {
  items.sort((item1, item2) => item2.id - item1.id);

  return items[0].id + 1;
};

export const findUserById = (id: number) => {
  return users.find(user => user.id === id);
};
