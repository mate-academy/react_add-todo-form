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
    <div className="todo-card" key={todo.id}>
      <p data-cy="title">
        <b>Title: </b>
        {title}
      </p>

      <UserInfo user={user} />

      <p data-cy="status">
        <b>Status: </b>
        {
          completed
            ? <span className="todo-card__status--done">Complete</span>
            : <span className="todo-card__status--todo">Not completed!</span>
        }
      </p>
    </div>
  );
};
