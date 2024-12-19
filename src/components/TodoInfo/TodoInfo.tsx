import { Todo } from '../../types';
import React from 'react';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';
type Props = {
  todo: Todo;
};
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <td
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </td>
  );
};
