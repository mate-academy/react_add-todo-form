import React from 'react';
import { Todo } from '../../type/todos';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="card">
      <div className="card__item">
        <p><strong>Title:&nbsp;</strong></p>
        <p>{todo.title}</p>
      </div>
      <div className="card__item">
        {todo.user && (
          <UserInfo user={todo.user} />
        )}
      </div>

    </div>
  );
};
