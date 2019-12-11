import todos from '../../api/todos';
import users from '../../api/users';

const todosArr = todos.map(todo => (
  {
    ...todo,
    userName: users.find(user => todo.userId === user.id).name,
  }));

export default todosArr;
