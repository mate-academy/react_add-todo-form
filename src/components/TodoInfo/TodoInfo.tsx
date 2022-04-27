import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = Todo;

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => (
  <>
    <h2 className="todos__title">{title}</h2>
    <div className="todos__completed">{completed ? 'completed' : 'uncompleted'}</div>
    <div className="todos__user">
      {user && (
        <UserInfo
          name={user.name}
          email={user.email}
        />
      )}
    </div>
  </>
);
