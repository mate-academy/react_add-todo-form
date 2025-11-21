import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../api/types';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return todos.map(todo => <TodoInfo key={todo.id} todo={todo} />);
};

export default TodoList;
