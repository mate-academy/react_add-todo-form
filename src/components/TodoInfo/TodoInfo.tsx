import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

interface TodoInfoProps {
  todo: Todo,
}

export const TodoInfo: React.FC<TodoInfoProps> = ({
  todo: {
    title,
    completed,
    id,
    user,
  },
}) => {
  return (
    <article data-id={id} className={`TodoInfo${completed ? ' TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
