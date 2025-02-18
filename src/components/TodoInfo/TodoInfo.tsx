import React from 'react';
import classNames from 'classnames';
import { TodosWithUser } from '../../types/TodosWithUser';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodosWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
