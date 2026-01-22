import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {/* FIX: Guard check (Захисна перевірка) */}
      {/* Якщо todo.user існує, то рендеримо компонент, інакше - нічого */}
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
