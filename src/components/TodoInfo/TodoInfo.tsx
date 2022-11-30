import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

export const TodoInfo = ({ todo }: { todo:Todo }) => {
  const {
    completed,
    id,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
