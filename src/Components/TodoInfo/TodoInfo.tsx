import React from 'react';
import { PreparedTodo } from '../../Types/PreparedTodo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: PreparedTodo;
};

export const TodoInfo:React.FC<Props> = ({ todo }) => (
  <div className="todo__wrap">
    <p>{todo.title}</p>
    <p>
      {
        todo.completed
          ? 'Competed'
          : 'In Process'
      }
    </p>
    {todo.user && <UserInfo {...todo.user} />}
  </div>
);
