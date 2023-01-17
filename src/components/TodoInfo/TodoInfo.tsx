import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    title, id, completed, user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo',
        {
          'TodoInfo--completed': completed,
        })}
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
