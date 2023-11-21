import React from 'react';
import classNames from 'classnames';
import { Todos } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoListProps {
  todo: Todos;
}

export const TodoInfo: React.FC<TodoListProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todo.user && <UserInfo user={todo.user} />}

    </article>
  );
};
