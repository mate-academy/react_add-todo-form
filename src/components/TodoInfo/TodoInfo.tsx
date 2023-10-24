import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
};

export const TodoInfo: React.FC<Props> = ({
  id,
  title,
  userId,
  completed = false,
}) => {
  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo
        userId={userId}
      />
    </article>
  );
};
