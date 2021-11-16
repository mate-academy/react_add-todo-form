import { Todo } from './types';
import { TodoInfo } from './TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li className="todo-list__element">
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      </li>
    ))}
  </ul>
);
