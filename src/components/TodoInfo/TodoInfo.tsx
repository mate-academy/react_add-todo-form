import React from 'react';

import User from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  title: string;
  completed: boolean;
  user: User;
};

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => (
  <div className={`card ${completed ? 'border-success' : 'border-danger'}`}>
    <div className="card-body">
      <h4 className="card-title">{title}</h4>
      <h5 className="card-subtitle text-muted">
        {`Status: ${completed ? 'Completed' : 'Not completed!'}`}
      </h5>
    </div>

    <div className="card-footer">
      <UserInfo
        name={user.name}
        username={user.username}
        email={user.email}
      />
    </div>
  </div>
);
