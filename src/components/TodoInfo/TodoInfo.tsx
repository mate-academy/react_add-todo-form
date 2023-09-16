import React from 'react';
import classNames from 'classnames';
import { UserInfo, User } from '../UserInfo';

interface TodoInfoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number | string;
    user?: User;
  };
}

const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    id, title, completed, user,
  } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};

export { TodoInfo };
