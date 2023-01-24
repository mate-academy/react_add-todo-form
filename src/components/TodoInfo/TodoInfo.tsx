import React, { memo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = memo(({ todo }) => {
  const {
    id, completed, title, user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed bg-success': completed },
      )}
    >
      <h2 className="TodoInfo__title">{ title }</h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
});
