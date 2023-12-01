import classNames from 'classnames';

import { Todo } from '../../interfaces/interfaces';
import { UserInfo } from '../UserInfo';

interface TodoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('input', {
        TodoInfo: true,
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
