import { FC } from 'react';
import classNames from 'classnames';

import { UserInfo } from '../UserInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number | null;
    user: User | null;
  }
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
