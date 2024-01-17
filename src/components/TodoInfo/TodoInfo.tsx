import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  id: number;
  title: string;
  userName: string;
  userEmail: string;
  completed: boolean;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({
  id,
  title,
  userName,
  userEmail,
  completed,
}) => (
  <article
    data-id={id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': completed === true,
    })}
  >
    <h2 className="TodoInfo__title">{title}</h2>
    <UserInfo
      userName={userName}
      userEmail={userEmail}
    />
  </article>
);
