import classNames from 'classnames';
import React from 'react';
import { NewTodo } from '../../types/NewTodo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: NewTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed ? true : false,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
