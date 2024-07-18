import React from 'react';
import classNames from 'classnames';
import { ToDoUser } from '../../types/ToDoUser';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ToDoUser;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { id, title, completed, user },
}) => {
  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
