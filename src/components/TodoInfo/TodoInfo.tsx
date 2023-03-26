import classNames from 'classnames';
import React from 'react';

interface Users {
  id: number,
  name: string,
  username: string,
  email: string,
}

interface Lists {
  id: number,
  title: string,
  completed: boolean,
  userId: Users | undefined,
}

type Props = {
  todo: Lists,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {userId !== undefined && (
        <a className="UserInfo" href={userId.email}>
          {userId.name}
        </a>
      )}
    </article>
  );
};
