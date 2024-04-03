import React from 'react';
import { Todos } from '../types';
import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { findIdUser } from '../../services/functionFind';

interface Props {
  todo: Todos;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={findIdUser(todo)} />
    </article>
  );
};
