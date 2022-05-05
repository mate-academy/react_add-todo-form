import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo [];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <li key={todo.id} className="todoList__item">
        <TodoInfo {...todo} />
      </li>
    ))}
  </ul>
);
