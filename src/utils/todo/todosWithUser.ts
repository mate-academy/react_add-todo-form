import { ITodo } from '../../types/todo';
import getUserById from '../user/getuserById';

const todosWithUser = (todos: ITodo[]) =>
  todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

export default todosWithUser;
