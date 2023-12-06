import React from 'react';
import cn from 'classnames';
import './TodoInfo.scss';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
  // users: User[];
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  // const currentUser = users.find(user => user.id === todo.userId) as User;

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

      {todo.user && <UserInfo user={todo.user} />}

      {/* <UserInfo user={todo.user} /> */}
    </article>
  );
};
