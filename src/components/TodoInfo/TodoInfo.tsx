import classNames from 'classnames';
import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<{ todo: Todo }>
= ({
  todo: {
    id,
    completed,
    title,
    user,
  },
}) => {
  return (
    <article
      data-id={`${id}`}
      className={
        classNames('TodoInfo', { 'TodoInfo--completed': completed })
      }
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
