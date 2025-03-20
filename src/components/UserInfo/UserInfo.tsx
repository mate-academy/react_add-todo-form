import React from 'react';
import { Todo } from '../../App';

type Props = {
  user: Todo['user'];
};

export const UserInfo: React.FC<Props> = ({ user }) =>
  user && (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
