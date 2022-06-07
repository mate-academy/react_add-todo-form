import React from 'react';
import { FullTodo } from '../../react-app-env';
// import { FullTodo } from '../../react-app-env';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: FullTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <span className="card-body">
    <h6>{todo.title}</h6>
    <p>{todo.completed ? 'completed' : 'not completed'}</p>
    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </span>
);
