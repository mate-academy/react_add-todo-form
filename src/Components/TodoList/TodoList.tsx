import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  preparedTodos: Todo [];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todoList">
    {preparedTodos.map(todo => (
      <li key={todo.id} className="todoList__item">
        <TodoInfo {...todo} />
      </li>
    ))}
  </ul>
);
