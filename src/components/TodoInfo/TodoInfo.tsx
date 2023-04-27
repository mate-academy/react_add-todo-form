import { FC } from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  const { title, user, completed } = todo;

  return (
    <article
      data-id="1"
      className={classNames('TodoInfo', {
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
