import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        <TodoInfo title={todo.title} completed={todo.completed} user={todo.user} />
      </li>
    ))}
  </ul>
);
