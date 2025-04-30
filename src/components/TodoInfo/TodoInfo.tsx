import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="TodoInfo" data-id={todo.id}>
    <h3>{todo.title}</h3>
    <UserInfo user={todo.user} />
  </div>
);
