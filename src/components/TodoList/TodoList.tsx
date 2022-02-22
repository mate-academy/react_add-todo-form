import { PreparedTodo } from '../../types/PreparedTodo';

import TodoInfo from '../TodoInfo/TodoInfo';

import './TodoList.scss';

type Props = {
  preparedTodos: PreparedTodo[];
};

const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todo-list">
    {preparedTodos.map(preparedTodo => (
      <li className="todo-list__item" key={preparedTodo.title}>
        <TodoInfo preparedTodo={preparedTodo} />
      </li>
    ))}
  </ul>
);

export default TodoList;
