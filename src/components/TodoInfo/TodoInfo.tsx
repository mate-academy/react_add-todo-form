import React from 'react';
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
    className={completed
      ? 'TodoInfo TodoInfo--completed'
      : 'TodoInfo'}
  >
    <h2 className="TodoInfo__title">
      {title}
    </h2>

    <UserInfo
      name={user.name}
      email={user.email}
    />
  </article>
);
