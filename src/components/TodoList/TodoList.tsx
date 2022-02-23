import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => (
  <ul className="todosList">
    {todos.map(todo => (
      <li key={todo.id} className="todos__item">
        {todo.title}
        <TodoInfo {...todo} />
      </li>
    ))}
  </ul>
);
