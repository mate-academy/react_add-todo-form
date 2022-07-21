import React from 'react';
import './TodoInfo.scss';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <div className="todo__item">
      <h4>{title}</h4>

      {user && (
        <UserInfo user={user} />
      )}

      {
        completed
          ? <p className="todo__item--complete">Complete</p>
          : <p className="todo__item--uncomplete">Not completed!</p>
      }
    </div>
  );
};
