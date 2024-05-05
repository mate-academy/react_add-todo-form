import React from 'react';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';
import TodosWithUsers from '../../types/TodosWithUsers';

interface Props {
  todo: TodosWithUsers;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
