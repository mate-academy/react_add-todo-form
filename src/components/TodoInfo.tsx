import React from 'react';
import { Todo } from '../types/todo';
import { UserInfo } from './UserInfo';

import './TodoInfo.scss';

type Props = Todo;

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => (
  <>
    <div className="todo-content">
      <p className="title">{title}</p>
      {completed
        ? <p className="completed">completed</p>
        : <p className="in-progress">in progress</p>}
      <hr />
    </div>
    <div className="user-content">
      {user && (
        <UserInfo
          name={user.name}
          email={user.email}
          phone={user.phone}
          website={user.website}
        />
      )}
    </div>
  </>
);
