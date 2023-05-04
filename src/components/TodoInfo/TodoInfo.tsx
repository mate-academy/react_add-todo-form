/* eslint-disable no-console */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
  onDelete: () => void;
};

export const TodoInfo: React.FC<Props> = React.memo((
  { todo, onDelete },
) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && (
        <UserInfo user={todo.user} />
      )}

      <button className="TodoInfo__button" type="button" onClick={onDelete}>
        x
      </button>
    </article>
  );
});
