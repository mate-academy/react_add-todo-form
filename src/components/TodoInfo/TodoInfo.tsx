import React from 'react';
import { UserInfo } from '../UserInfo';
import { getUserById } from '../../types/user';
import { Todos } from '../../types/todos';

interface Props {
  todo: Todos;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
      data-cy="TodoInfo"
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={getUserById(todo.userId)} />
    </div>
  );
};
