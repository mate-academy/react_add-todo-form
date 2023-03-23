import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <>
      {user && (
        <article
          data-id={id}
          className={
            classNames('TodoInfo', { 'TodoInfo--completed': completed })
          }
        >
          <h2 className="TodoInfo__title">{title}</h2>

          <UserInfo user={user} />
        </article>
      )}
    </>
  );
};
