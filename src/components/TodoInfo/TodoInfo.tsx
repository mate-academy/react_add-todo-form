import cn from 'classnames';
import React from 'react';
import { Todo, User } from '../TodoList';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo & { user?: User };
  user: User | undefined;
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  const userToRender = user || todo.user;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={userToRender} />
    </article>
  );
};
