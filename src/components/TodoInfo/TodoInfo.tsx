import React from 'react';
import { PreparedTodo } from '../../react-app-env';

import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  preparedTodo: PreparedTodo;
};

export const TodoInfo: React.FC<Props> = ({ preparedTodo }) => (
  <>
    <h3 className="todoTitle">{preparedTodo.title}</h3>
    <div className="todoCompleted" data-cy="status">
      {preparedTodo.completed ? 'Completed!' : '...in progress...'}
    </div>
    {preparedTodo.user && <UserInfo user={preparedTodo.user} />}
  </>
);
