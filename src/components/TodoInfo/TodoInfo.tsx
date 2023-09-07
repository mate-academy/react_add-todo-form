import React from 'react';
import cn from 'classnames';

import { UserInfo } from '../UserInfo';

import { TodoType, UserType } from '../../types';
import usersFromServer from '../../api/users';
import { findUserByID } from '../../helpers/findUserById';

type Props = {
  todo: TodoType,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const user = findUserByID(userId, usersFromServer) as UserType;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
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
