import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../type/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id, title, user,
  } = todo;

  return (
    <article
      data-id={id}
      className={
        classNames('TodoInfo', { 'TodoInfo--completed': todo.completed })
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (<UserInfo user={user} />)}
    </article>
  );
};
