import React from 'react';
import { Todo } from '../Types/Todo';

export const UserInfo = ({ user }: { user: Todo['user'] }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
