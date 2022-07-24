import React from 'react';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  title: string;
  completed: boolean;
  user: User | null;
};

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => {
  return (
    <div className="todo">
      <h3 className="titleTodo">{title}</h3>
      <p>
        <b>Status: </b>
        {completed ? 'compeleted' : 'not completed'}
      </p>
      {user && (
        <UserInfo user={user.name} />
      )}
    </div>
  );
};
