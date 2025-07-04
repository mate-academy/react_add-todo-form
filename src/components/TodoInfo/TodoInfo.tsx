import { TodoItem } from '../../types/TodoItem';
import React from 'react';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';
import { getUserById } from '../../service/UserService';

type Props = {
  todo: TodoItem;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

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
