import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoWithUser } from '../../types/TodoWithUser';
import './TodoList.scss';

type Prop = {
  todos: TodoWithUser[],
};

export const TodoList: React.FC<Prop> = ({ todos }) => (
  <ul className="todos">
    {todos.map((todo) => (
      <li className="todos__todo todo" key={todo.id}>
        <TodoInfo {...todo} />
      </li>
    ))}
  </ul>
);
