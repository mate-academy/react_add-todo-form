import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../Todo';

import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todos">
    { todos.map(preparedTodo => (
      <li key={preparedTodo.id} className="todos__item">
        <TodoInfo
          title={preparedTodo.title}
          completed={preparedTodo.completed}
          user={preparedTodo.user}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
