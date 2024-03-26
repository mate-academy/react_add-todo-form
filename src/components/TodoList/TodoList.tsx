import { ToDo } from '../../type/ToDo';
import './TodoList.scss';

import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: ToDo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      <ul className="TodoList--ul">
        {todos.map(todo => (
          <li className="TodoList--li">
            <TodoInfo todo={todo} key={todo.id} />
          </li>
        ))}
      </ul>
    </section>
  );
};
