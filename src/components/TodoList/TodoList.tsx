import { Todo } from '../../types/Todo';
import './todoList.scss';

type Props = {
  preparedTodos: Todo[],
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todo__list">
    {preparedTodos.map(todo => (
      <li key={todo.id}>
        {todo.user?.name}
        ---
        {todo.user?.username}
        {todo.title}
      </li>
    ))}
  </ul>
);
