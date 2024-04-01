import React from 'react';
import { TodoType } from '../TodoList';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

interface Types {
  todo: TodoType;
}

export const TodoInfo: React.FC<Types> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
