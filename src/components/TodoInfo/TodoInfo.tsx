import React from 'react';
import { PreparedTodo } from '../../react-app-env';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todo: PreparedTodo;
}
export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    {todo.user && (
      <UserInfo user={todo.user} />
    )}

    <h3>{todo.title}</h3>
    <h3 className={todo.completed ? 'task-status--comp' : 'task-status'}>
      {todo.completed
        ? 'completed!'
        : 'not completed'}
    </h3>
  </>
);
