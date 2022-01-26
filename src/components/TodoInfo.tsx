import classNames from 'classnames';
import React from 'react';

import { UserInfo } from './UserInfo';

export const TodoInfo: React.FC<PreparedTodos> = ({
  title,
  completed,
  user,
}) => (
  <div className={classNames(
    'ui card',
    {
      red: !completed,
      green: completed,
    },
  )}
  >
    <div className="content">
      <div className="header">
        {`Todo: ${title}`}
      </div>
    </div>
    {user && <UserInfo {...user} />}
    <div className="extra content">
      <button
        type="button"
        className={classNames(
          'ui button green',
          {
            red: !completed,
            green: completed,
          },
        )}
      >
        {completed ? 'Completed' : 'Uncompleted'}
      </button>
    </div>
  </div>
);
