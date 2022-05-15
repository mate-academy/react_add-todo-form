import React from 'react';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

import './TodoItem.scss';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => (
  <div className="TodoItem">
    <div className="TodoItem__userInfo">
      {todo.user && <UserInfo user={todo.user} />}
    </div>

    <div className="TodoItem__task">
      <p className="TodoItem__todoTitle">{todo.title}</p>
      <p className="TodoItem__todoSatus">
        {todo.completed ? 'Completed' : 'Not completed'}
      </p>
    </div>
  </div>
);
