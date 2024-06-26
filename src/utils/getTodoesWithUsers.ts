import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';

export const todosWithUsers = todosFromServer.map(todo => {
  const user = usersFromServer.find(person => person.id == todo.userId);

  return {
    ...todo,
    user,
  };
});
