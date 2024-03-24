import React from 'react';
import cn from 'classnames';

import { ToDo } from '../../type/ToDo';

import { UserInfo } from '../UserInfo';
import { findUserID } from '../../services/findUserID';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  if (todo.userId === undefined) {
    return null;
  }

  const currentUser = findUserID(todo.userId);

  return (
    <article
      data-id={todo.id} // it's was hardcode
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {currentUser && <UserInfo user={currentUser} />}
    </article>
  );
};
