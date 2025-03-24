import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/types';
import { User } from '../../types/types';

interface TodoInfoProps {
  todo: Todo;
  user: User;
}
export const TodoInfo: React.FC<TodoInfoProps> = ({
  todo,
  user,
}: TodoInfoProps) => {
  return (
    <article
      className={`TodoInfo ${todo?.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo?.id}
    >
      <h2 className="TodoInfo__title">{todo?.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
