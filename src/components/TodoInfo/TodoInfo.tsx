import React from 'react';
import classname from 'classnames';
import { TodoWithUser } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={classname('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
