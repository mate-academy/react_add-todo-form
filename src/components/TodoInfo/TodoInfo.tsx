import classNames from 'classnames';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <li
      data-id={todo.id}
      className={classNames(
        'TodoInfo', { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </li>
  );
};
