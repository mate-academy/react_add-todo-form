import React from 'react';
import classNames from 'classnames';
import { PreparedTodo } from '../../react-app-env';

import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  preparedTodo: PreparedTodo;
};

export const TodoInfo: React.FC<Props> = ({ preparedTodo }) => (
  <>
    <h3 className="todoTitle title is-3">{preparedTodo.title}</h3>
    <div
      className={
        classNames(
          'notification',
          'is-light',
          {
            'is-danger': !preparedTodo.completed,
            completed: preparedTodo.completed,
          },
        )
      }
      data-cy="status"
    >
      {preparedTodo.completed ? 'Completed!' : '...in progress...'}
    </div>
    {preparedTodo.user && <UserInfo user={preparedTodo.user} />}
  </>
);
