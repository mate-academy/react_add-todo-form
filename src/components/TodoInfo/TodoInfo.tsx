import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<Todo> = ({ title, user, completed }) => (
  <article
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
