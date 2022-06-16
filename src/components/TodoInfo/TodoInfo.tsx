import React from 'react';
import { User } from '../../react-app-env';
import { UserInfo } from '../UserInfo';
import 'bulma/css/bulma.min.css';
import './TodoInfo.scss';

interface Props {
  title: string,
  completed: boolean,
  user: User | null | undefined,
}

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => (
  <div className="todo box has-background-light mx-3 my-3 has-text-centered">
    <h2 data-cy="title" className="has-text-weight-bold">{title}</h2>
    <h3 className="todos__status" data-cy="status">
      {completed ? 'Completed!' : 'Not completed!'}
    </h3>
    {user && (
      <UserInfo
        name={user.name}
        email={user.email}
      />
    )}
  </div>
);
