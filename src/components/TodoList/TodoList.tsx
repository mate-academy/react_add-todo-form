import { Todos } from '../../types/Todos';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        <TodoInfo
          title={todo.title}
          status={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);
