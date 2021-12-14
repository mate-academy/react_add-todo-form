import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-list__item">
          <TodoInfo
            title={todo.title}
            completed={todo.completed}
          />
          {todo.user && <UserInfo user={todo.user} />}
        </li>
      ))}
    </ul>
  );
};
