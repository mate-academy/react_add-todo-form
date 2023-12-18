import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/postInfo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article data-id={todo.id} className={`TodoInfo ${cn({ 'TodoInfo--completed': todo.completed })}`}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
