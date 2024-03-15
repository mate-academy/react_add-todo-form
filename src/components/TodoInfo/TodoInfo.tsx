import React from 'react';
import cn from 'classnames';
import { TodoType } from '../../types/TodoType';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoType;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user, id, title } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${cn({ 'TodoInfo--completed': todo.completed })}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
