import React from 'react';
import { Todos } from '../types';
import { findIdUser } from '../../services/findIdUser';
import cn from 'classnames';

interface Props {
  todo: Todos;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed} = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <a className="UserInfo" href={`mailto:${findIdUser(todo)?.email}`}>
        {findIdUser(todo)?.name}
      </a>
    </article>
  );
};
