import React from 'react';
import usersFromServer from '../../api/users';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type InfoProps = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  };
};

export const TodoInfo: React.FC<InfoProps> = ({ todo }) => {
  const user = usersFromServer.find(userf => userf.id === todo.userId);

  if (!user) {
    throw new Error(`User with ID ${todo.userId} not found`);
  }

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--complited': todo.completed === true,
      })}
      key={todo.id}
    >
      <h2 className="TodoInfo_title">{todo.title} </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
