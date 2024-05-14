import React from 'react';
import { UserInfo } from '../UserInfo';
import { TodosWithUser } from '../../types/ToDosWithUser';
import classNames from 'classnames';

type Props = {
  todo: TodosWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames(
      `TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`,
    )}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
