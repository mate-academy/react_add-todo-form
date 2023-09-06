import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/getUserById';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
