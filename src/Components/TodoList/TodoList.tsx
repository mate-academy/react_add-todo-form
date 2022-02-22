import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../Types/Todo';

import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todos">
    {
      todos.map(todo => (
        <li key={todo.id} className="todos__item todo">
          <TodoInfo
            title={todo.title}
            completed={todo.completed}
            user={todo.user}
          />
        </li>
      ))
    }
  </ul>
);
