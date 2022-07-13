import React from 'react';
import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todo">
    {todo.user && (
      <UserInfo user={todo.user} />
    )}

    <h2 className="todo__title">{todo.title}</h2>
    <p className="todo__status">{todo.completed ? 'Is done' : 'in progress'}</p>
  </div>
);
