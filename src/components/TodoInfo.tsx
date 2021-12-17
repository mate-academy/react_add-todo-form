import React from 'react';
import { Todo } from '../types/Todo';
import { UserInfo } from './UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div>
      <h2>{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </div>
  );
};
