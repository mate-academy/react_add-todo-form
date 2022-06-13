import React from 'react';
import './todoinfo.scss';
import { PreparedTodo } from '../../react-app-env';

interface Props {
  todo: PreparedTodo,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="message-body">
    <div data-cy="title">{todo.title}</div>
    <div
      data-cy="status"
      className={`${todo.completed
        ? 'Complected'
        : 'Complected-false'}`}
    >
      {`Сompleted: ${todo.completed}`}
    </div>
  </div>
);
