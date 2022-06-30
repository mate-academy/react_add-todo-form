import React from 'react';
import { Todo } from '../../react-app-env';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todo">
    {todo.user && (
      <UserInfo user={todo.user} />
    )}
    <h3 className="todo__title" data-cy="title">
      {todo.title}
    </h3>
    <p className="todo__status" data-cy="status">
      {todo.completed ? 'Completed!' : 'Not completed!'}
    </p>
  </div>
);
