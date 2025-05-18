import { UserInfo } from '../UserInfo';
import type { Todo, User } from '../../types/types';
import React from 'react';
import classNames from 'classnames';

type TodoInfoProps = {
  id: Todo['id'];
  title: Todo['title'];
  completedStatus: Todo['completed'];
  userId: Todo['userId'];
  user: User | null;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({
  title,
  completedStatus,
  // userId,
  user,
}) => {
  return (
    <article
      data-id="1"
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completedStatus === true,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
