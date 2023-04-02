import React from 'react';
import { Todo } from '../../types/Todo';

export const UserInfo: React.FC<{ todo: Todo }> = ({ todo }) => (
  <>
    {todo.user && (
      <a className="UserInfo" href={`mailto:${todo.user.email}`}>
        {todo.user.name}
      </a>
    )}
  </>
);
