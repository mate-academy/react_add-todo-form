import React from 'react';
import classNames from 'classnames';
import { User, UserInfo } from '../UserInfo';

export type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | null,
};

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id, title, completed, user,
  } = todo;

  return (
    <>
      <article key={id} data-id={id} className="TodoInfo TodoInfo--completed">
        <h2
          className={classNames(
            'TodoInfo', { 'TodoInfo--completed': completed },
          )}
        >
          {title}
        </h2>
        {user && <UserInfo user={user} />}
      </article>
    </>
  );
};
