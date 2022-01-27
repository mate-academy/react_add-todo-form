import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: PreparedTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <div className="todo-title">
      {todo.title}
    </div>
    {todo.completed && <div className="todo-completed">Completed</div>}
    {todo.user && <UserInfo user={todo.user} />}
  </>
);
