import React from 'react';
import { UserInfo } from './UserInfo';
import { TodoInfoProps } from '../types';

export const TodoInfo: React.FC <TodoInfoProps> = ({
  todo,
}) => {
  return (
    <>
      {todo.user && (<UserInfo user={todo.user} />)}
      <h2 className="list__item-title">{todo.title}</h2>
      <p className="list__item-completed">
        {todo.completed ? 'completed' : 'not completed'}
      </p>
    </>
  );
};
