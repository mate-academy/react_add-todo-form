import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, user, id } = todo;

  return (
    <article
      data-id={id}
      className={
        classNames(
          'TodoInfo',
          { 'TodoInfo--completed': todo.completed },
        )
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
