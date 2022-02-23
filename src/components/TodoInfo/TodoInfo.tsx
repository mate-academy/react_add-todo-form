import React from 'react';
import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: PreparedTodo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todo-info">
    {todo.user && <UserInfo user={todo.user} />}
    <div className="todo-info__task-block">
      <span className="todo-info__task">Task:</span>
      <span className="todo-info__task-text">{todo.title}</span>
    </div>
    <div>
      <span className="todo-info__status">Status:</span>
      <span className={cn(
        {
          'todo-info__status--completed': todo.completed,
          'todo-info__status--uncompleted': !todo.completed,
        },
      )}
      >
        {todo.completed ? 'completed' : 'incompleted'}
      </span>
    </div>
  </div>
);
