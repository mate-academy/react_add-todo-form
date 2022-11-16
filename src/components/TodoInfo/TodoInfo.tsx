import React from 'react';
import classNames from 'classnames';
import './Todoinfo.scss';
import { TodoInfoProps } from '../../typedefs';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >

      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
