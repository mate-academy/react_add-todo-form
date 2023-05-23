import React from 'react';
import classname from 'classnames';
import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo,
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    title,
    completed,
    user,
    id,
  } = todo;

  return (
    <article
      data-id={id}
      className={
        classname('TodoInfo', {
          'TodoInfo--completed': completed,
        })
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
