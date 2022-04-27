import React from 'react';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  title: string,
  complited: boolean,
  user: User,
};

export const TodoInfo = React.memo<Props>(
  ({ title, complited, user }) => (
    <>
      <h3>{title}</h3>
      <p>{complited ? 'Done' : 'Not done'}</p>
      <UserInfo name={user.name} email={user.email} />
    </>
  ),
);
