import React from 'react';
import { Todo } from '../../types/Todo';

import { UserInfo } from '../UserInfo/UserInfo';
interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <span className="TodoInfo__title">{todo.title}</span>

      {todo.user && <UserInfo user={todo.user} />}
    </div>
  );
};
