import { TodoInfo } from '../TodoInfo';
import { TodosProps } from '../../types/Todo';

export const TodoList: React.FC<{ todos: TodosProps[] }> = ({ todos }) =>
  todos.map(todo => <TodoInfo todo={todo} key={todo.id} />);
