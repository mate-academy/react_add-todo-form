import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  const {
    name,
    email,
    id: userId,
  } = user;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo
        user={user}
        id={userId}
        name={name}
        email={email}
      />
    </article>
  );
};
