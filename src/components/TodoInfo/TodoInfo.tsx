import React from 'react';
import classNames from 'classnames';
import { TodoForRender } from '../types/Todo';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<TodoForRender> = ({
  title,
  id,
  completed,
  user,
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
        <UserInfo {...user} />
      )}
    </article>
  );
};
