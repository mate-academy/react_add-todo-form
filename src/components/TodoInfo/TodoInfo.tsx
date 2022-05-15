import React from 'react';
import { Todo } from '../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <h2 className="todoInfo__title">{todo.title}</h2>
    <span
      className={todo.completed === true ? ('todoInfo__completed') : ('todoInfo__completed--false')}
    >
      {todo.completed ? 'Done' : 'Not complited'}
    </span>
    {todo.user && <UserInfo user={todo.user} />}
  </>
);
