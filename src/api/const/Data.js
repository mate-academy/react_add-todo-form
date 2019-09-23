import todos from '../todos';
import users from '../users';

const TodosAndUsers = (todosList, usersList) => (
  todosList.map(todo => (
    {
      ...todo,
      user: usersList.find(user => user.id === todo.userId),
    }
  ))
);

const todosWithUsers = TodosAndUsers(todos, users);

export default todosWithUsers;
