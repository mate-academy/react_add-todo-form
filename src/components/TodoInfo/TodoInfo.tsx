import React from 'react';
import cn from 'classnames';

import { ToDo } from '../../type/ToDo';

import { UserInfo } from '../UserInfo';
import { findUserID } from '../../services/findUserID';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { title, userId, completed, id },
}) => {
  if (userId === undefined) {
    return null;
  }

  const currentUser = findUserID(userId);

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {currentUser && <UserInfo user={currentUser} />}
    </article>
  );
};
