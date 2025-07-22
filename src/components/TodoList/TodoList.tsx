import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList = ({ todos }) =>
  todos.map(todo => <TodoInfo todo={todo} key={todo.id} />);
