import { TodoInfo } from '../TodoInfo/TodoInfo';
import { FullTodo } from '../types/FullTodo';

import './TodoList.css';

type Props = {
  todoList: FullTodo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => (
  <ul className="todo-list">
    {todoList.map(todo => (
      <li className="todo-item" key={todo.id}>
        <TodoInfo fullTodo={todo} />
      </li>
    ))}
  </ul>
);
