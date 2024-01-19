import React from 'react';
import classNames from 'classnames';
import { TodoWithUser } from '../../types/TodoWithUser';
import { UserInfo } from '../UserInfo';

type Props = {
  todoWithUser: TodoWithUser,
};

export const TodoInfo: React.FC<Props> = ({ todoWithUser }) => {
  const {
    id, title, completed, user,
  } = todoWithUser;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
