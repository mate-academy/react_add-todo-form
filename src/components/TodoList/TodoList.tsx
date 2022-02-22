import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="preparedTodos">
    {todos.map(todo => (
      <li key={todo.id} className="preparedTodos__item">
        <TodoInfo {...todo} />
      </li>
    ))}
  </ul>
);
