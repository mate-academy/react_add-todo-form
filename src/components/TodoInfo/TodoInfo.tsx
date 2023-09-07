import React from 'react';
import classnames from 'classnames';
import { ToDoWithUser } from '../../types';
import { UserInfo } from '../UserInfo/UserInfo';

interface TodoInfoProps {
  todo: ToDoWithUser;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => (
  <article
    data-id={todo.id}
    key={todo.id}
    className={classnames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
