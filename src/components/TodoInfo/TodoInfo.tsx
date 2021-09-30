import React from 'react';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { todo } = props;
  const { user, title, completed } = todo;

  return (
    <>
      <UserInfo {...user} />
      <li className="users__table-item">{title}</li>
      <li className="users__table-item">{completed ? 'Yes' : 'No'}</li>
    </>
  );
};
