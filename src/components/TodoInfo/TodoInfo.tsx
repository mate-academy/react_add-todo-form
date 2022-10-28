import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodosWithUsers } from '../../types/type';

type Props = {
  todo: TodosWithUsers;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </article>
);
