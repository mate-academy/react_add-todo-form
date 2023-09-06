import './TodoInfo.scss';
import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { PreparedTodo } from '../../types/PreparedTodo';

interface Props {
  todo: PreparedTodo,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />

    </article>
  );
};
