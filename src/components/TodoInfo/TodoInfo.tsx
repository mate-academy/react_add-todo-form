import React from 'react';
import classnames from 'classnames';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  user: User;
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ user, todo }) => {
  const { id, title, completed } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={classnames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
