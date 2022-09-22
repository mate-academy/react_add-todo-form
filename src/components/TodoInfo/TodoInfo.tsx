import React from 'react';
import classNames from 'classnames';
import { Todo, User } from '../../types';

type Props = {
  todo: Todo;
  user: User | undefined;
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <>
      <article
        data-id="1"
        className={classNames(
          'TodoInfo',
          { 'TodoInfo--completed': todo.completed },
        )}
      >
        <h2 className="TodoInfo__title">
          {todo.title}
        </h2>

        <a className="UserInfo" href="mailto:Sincere@april.biz">
          {user ? user.name : 'Unknown user'}
        </a>
      </article>
    </>
  );
};
