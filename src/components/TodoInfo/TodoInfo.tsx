import classNames from 'classnames';
import { Todo } from '../TodoList/TodoList';

export const TodoInfo = ({ todo }: { todo: Todo }) => (
  <div
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
    data-id={todo.id}
  >
    <span className="TodoInfo__title">{todo.title}</span>
    <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
      {todo.user?.name}
    </a>
  </div>
);
