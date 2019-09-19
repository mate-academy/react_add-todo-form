import todos from '../todos';
import users from '../users';

const getTodosWithUsers = (todoList, userList) => (
  todoList.map(todo => (
    {
      ...todo,
      user: userList.find(user => user.id === todo.userId),
    }
  ))
);

const todosWithUsers = getTodosWithUsers(todos, users);

export default todosWithUsers;
