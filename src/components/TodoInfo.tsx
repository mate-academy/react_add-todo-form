import React from 'react';
import { UserInfo } from './UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = (props) => {
  const { todo } = props;
  const { user, title, completed } = todo;

  return (
    <>
      {user && <UserInfo user={user} />}
      <td>{title}</td>
      <td>{completed ? 'Completed' : 'Not completed'}</td>
    </>
  );
};
