import classNames from 'classnames';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

type ToDoInf = {
  todo: Todo;
};

export const TodoInfo: React.FC<ToDoInf> = ({
  todo: {
    id,
    title,
    completed,
    user,
  },
}) => {
  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
