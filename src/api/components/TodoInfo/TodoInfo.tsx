import React from 'react';
import { Todo } from '../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

export const TodoInfo: React.FC<Todo> = ({ title, completed, user }) => (
  <>
    <div className="TodoInfo">
      <h2 className="TodoInfo__title" data-cy="title">
        {'Task: '}
        {title}
      </h2>
      <div className="TodoInfo__status">
        <p className="TodoInfo__status-title">Status: </p>
        <span
          data-cy="status"
          className={completed ? 'completed' : 'not completed'}
        >
          {completed === true ? 'completed' : 'not completed'}
        </span>
      </div>
      <p className="TodoInfo__userdata">User data:</p>
      <span>
        {!user ? 'No user info' : <UserInfo {...user} />}
      </span>
    </div>
  </>
);
