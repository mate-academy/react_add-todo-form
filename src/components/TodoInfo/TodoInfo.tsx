import React from 'react';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user, title, completed } = todo;

  return (
    <div className="todo__li">
      {user && <UserInfo user={user} />}
      <div>
        {title}
      </div>
      <div>
        {completed ? 'done' : 'in progress'}
      </div>
    </div>
  );
};
