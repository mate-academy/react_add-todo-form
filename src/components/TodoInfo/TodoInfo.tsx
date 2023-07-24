import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types';
import './TodoInfo.scss';

export const TodoInfo: React.FC<Todo> = ({
  title,
  id,
  completed,
  user,
}) => (
  <article
    data-id={id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
  >
    <h2 className="TodoInfo__title">
      {title}
    </h2>

    {user && (
      <UserInfo
        name={user.name}
        email={user.email}
      />
    )}
  </article>
);
