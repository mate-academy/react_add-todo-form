import { TodoInfo } from '../TodoInfo/TodoInfo';
import './todoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo__list">
    {todos.map(todo => (
      <li className="todo__item" key={todo.id}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
