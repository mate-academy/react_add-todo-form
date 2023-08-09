import React from 'react';
import classNames from 'classnames';

import { UserInfo } from '../UserInfo';

type Props = {
  todo: {
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    } | null;
    id: number;
    title: string,
    completed: boolean;
    userId: number;
  }
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  if (!todo) {
    return null;
  }

  const {
    id,
    title,
    user,
    completed,
  } = todo;

  const articleClassName = classNames('TodoInfo', {
    'TodoInfo--completed': completed,
  });

  return (
    <article data-id={id} className={articleClassName}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
