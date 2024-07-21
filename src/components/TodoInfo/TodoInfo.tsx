import React from 'react';
import cn from 'classnames';
import './TodoInfo.scss';
import { TodoWithUser } from '../../utils/types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user ? (
        <UserInfo user={user} />
      ) : (
        <p className="UserInfo">User not found</p>
      )}
    </article>
  );
};
