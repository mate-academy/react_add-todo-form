import React from 'react';
import ClassNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo ;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { completed, title, user } = todo;

  return (
    <>
      <article className={ClassNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
      >
        <h2 className="TodoInfo__title">{title}</h2>
        {user && <UserInfo user={user} />}
      </article>
    </>
  );
};
