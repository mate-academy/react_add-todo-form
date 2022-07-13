import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoList.scss';

type Todos = {
  todos: Todo[];
};

export const TodoList: React.FC<Todos> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li
        key={todo.id}
        className="todo"
      >
        <UserInfo
          user={todo.user}
        />
        <TodoInfo
          userId={todo.userId}
          title={todo.title}
          completed={todo.completed}
        />
      </li>
    ))}
  </ul>
);
