import classNames from 'classnames';
import React from 'react';
import { TODO } from '../../types/todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: TODO;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo box', {
        'TodoInfo--completed': todo.completed,
      })}
      key={todo.id}
    >
      <h2
        className={classNames('TodoInfo__title title is-5', {
          'has-text-primary': todo.completed,
        })}
      >
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
