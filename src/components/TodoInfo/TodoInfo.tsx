import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    title, user, userId, id,
  } = todo;
  const isCompleted = todo.completed;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': isCompleted,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {`${title}`}
      </h2>

      {user && <UserInfo key={userId} user={user} />}
    </article>
  );
};
