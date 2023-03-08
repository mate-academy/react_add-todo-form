import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
