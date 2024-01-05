import React from 'react';
import cn from 'classnames';
import { Todos } from '../../types/Todos';
import { UserInfo } from '../UserInfo';

  type Props = {
    todo: Todos;
  };

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div>
      <article
        key={todo.id}
        data-id={todo.id}
        className={`TodoInfo ${cn({ 'TodoInfo--completed': todo.completed })}`}
      >
        <h2 className="TodoInfo__title">
          {todo.title}
        </h2>
        {todo.user && <UserInfo user={todo.user} />}
      </article>
    </div>
  );
};
