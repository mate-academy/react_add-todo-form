import React from 'react';
import cn from 'classnames';
import './TodoInfo.scss';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
  users: User[];
};

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  const currentUser = users.find(user => user.id === todo.userId) as User;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={currentUser} />
    </article>
  );
};
