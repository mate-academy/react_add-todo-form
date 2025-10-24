import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <p className="TodoInfo__title">{todo.title}</p>
      <UserInfo user={todo.user} />
    </div>
  );
};
