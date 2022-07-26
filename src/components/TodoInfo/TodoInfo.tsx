import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.css';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames(
      'TodoInfo', {
        'TodoInfo--completed': todo.completed,
      },
    )}
    key={todo.id}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>
    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </article>
);
