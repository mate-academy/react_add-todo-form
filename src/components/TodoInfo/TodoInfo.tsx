import React from 'react';
import { ToDo } from '../../types/ToDo';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

interface Props {
  todo: ToDo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user } = todo;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
