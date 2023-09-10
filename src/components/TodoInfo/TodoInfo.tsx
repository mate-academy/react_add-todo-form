import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { ToDo } from '../TSTypes/ToDo';

type Props = {
  todo: ToDo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
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
};
