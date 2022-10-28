import React from 'react';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  title: string;
  user: User | null;
};

function capitalized(string: string): string {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export const TodoInfo: React.FC<Props> = ({ title, user }) => (
  <>
    <h2 className="TodoInfo__title">
      { capitalized(title) }
    </h2>

    {user
      && <UserInfo {...user} />}
  </>
);
