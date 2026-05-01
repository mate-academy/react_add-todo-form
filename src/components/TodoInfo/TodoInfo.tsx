import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const className =
    `TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`.trim();

  return (
    <div className={className} data-id={todo.id}>
      <div className="TodoInfo__title">{todo.title}</div>
      <div className="TodoInfo__meta">
        {todo.user ? (
          <UserInfo user={todo.user} />
        ) : (
          <span className="TodoInfo__user">Unknown</span>
        )}
        <span className="TodoInfo__status">
          {todo.completed ? 'Done' : 'Open'}
        </span>
      </div>
    </div>
  );
};
