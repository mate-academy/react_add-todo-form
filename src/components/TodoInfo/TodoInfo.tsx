import { UserInfo } from '../UserInfo';
import { PreparedTodo } from '../../services/types';
import classNames from 'classnames';

type TodoInfoProps = {
  todo: PreparedTodo;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user ? (
      <UserInfo user={todo.user} />
    ) : (
      <p>No user information available</p>
    )}
  </article>
);
