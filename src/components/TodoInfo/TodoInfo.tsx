import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <h2 className="todoTitle">{todo.title}</h2>
      <input className="checkBox" type="checkbox" checked={todo.completed} />
      {todo.user && <UserInfo user={todo.user} />}
    </>
  );
};
