import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  preparedTodos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todo">
    {preparedTodos.map(todo => (
      <li className="todo__list" key={todo.id}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
