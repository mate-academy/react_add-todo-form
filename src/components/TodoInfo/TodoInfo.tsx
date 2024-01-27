import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../Type/todos';
import { UserInfo } from '../UserInfo';
import { getUserById } from '../../servises/UserId';

type TodoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const user = getUserById(userId);

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo ',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo
        user={user}
      />

    </article>
  );
};
