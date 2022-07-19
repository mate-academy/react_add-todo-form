import React from 'react';
import { ToDo } from '../../types/todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: ToDo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <div className="todo__item">
      <h4>{title}</h4>

      <UserInfo user={user} />

      {
        completed
          ? <p className="todo__item--complete">Complete</p>
          : <p className="todo__item--uncomplete">Not completed!</p>
      }
    </div>
  );
};
