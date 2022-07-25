import React from 'react';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Prop = {
  title: string;
  completed: boolean;
  user: User | null
};

export const TodoInfo: React.FC<Prop> = ({ title, completed, user }) => (
  <>
    <h2 data-cy="title">{title}</h2>
    <p data-cy="status">
      {completed ? ('Status: Done') : ('Status: In progress!')}
    </p>
    <UserInfo user={user} />
  </>
);
