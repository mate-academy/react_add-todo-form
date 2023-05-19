import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import './todoInfo.scss';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    title,
    completed,
    user,
  } = todo;

  const className = classNames(
    'TodoInfo',
    {
      'TodoInfo--completed': completed,
    },
  );

  return (
    <div
      data-id={todo.id}
      className={className}
    >
      <article>
        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {user && (
          <UserInfo user={user} />
        )}
      </article>
    </div>
  );
};
