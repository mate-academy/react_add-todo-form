import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../interfaces/interface';
import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => (
  <ol
    className="todo-list"
  >
    {todos.map(todo => (
      <li
        key={todo.id}
        className="todo-list__item"
      >
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
          todoId={todo.id}
        />
      </li>
    ))}
  </ol>
);
