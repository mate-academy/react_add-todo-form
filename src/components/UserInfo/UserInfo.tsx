import React from 'react';
import { Todo } from '../../types/types';
import { getUser } from '../../utils/getUser';

type Props = {
  todo: Todo;
};

export const UserInfo: React.FC<Props> = ({ todo }) => {
  const user = getUser(todo.userId);

  if (!user) {
    return <span className="UserInfo">Unknown User</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
