import React from 'react';
import { Todo } from '../types/Todo';
import { UserInfo } from './UserInfo';

type Props = Pick<Todo, 'title' | 'completed' | 'user'>;

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => {
  return (
    <div className="todo">
      <h2 className="todo__title">
        {title}
      </h2>
      <p className="todo__completed">
        {completed ? 'Completed' : 'Not completed'}
      </p>
      {user && <UserInfo name={user.name} email={user.email} />}
    </div>
  );
};
