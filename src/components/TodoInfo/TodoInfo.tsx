import React from 'react';
import { Todos } from '../types/Todos';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <td>
      {todo.title}
    </td>
    <td>
      {todo.completed ? 'completed' : 'in progress'}
    </td>
    {todo.user && <UserInfo user={todo.user} />}
  </>
);
