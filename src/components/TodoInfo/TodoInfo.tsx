import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodosAndUsers } from '../../types/todosAndUsers';

type Props = {
  todo: TodosAndUsers,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames(
      'TodoInfo',
      { 'TodoInfo--completed': todo.completed },
    )}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
