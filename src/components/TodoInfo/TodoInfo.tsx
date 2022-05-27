import React from 'react';
import { Todo } from '../../type/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todos">
    <h3 className="todos__title">
      {`Todo: ${todo.title}`}
    </h3>
    <h4 className="todos__status">
      {'Status: '}
      {todo.completed ? 'Completed' : 'Not comleted'}
    </h4>
    <p>User Info:</p>
    {todo.user && <UserInfo user={todo.user} />}
  </div>
);
