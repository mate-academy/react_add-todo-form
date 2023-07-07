import React from 'react';
import cn from 'classnames';
import { User } from '../../types/user';

type Props = {
  id: number,
  title: string,
  completed: boolean,
  user: User,
};

export const TodoInfo: React.FC<Props> = ({
  id,
  title,
  completed,
  user,
}) => {
  const { name, email } = user;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <a className="UserInfo" href={`mailto:${email}`}>
        {name}
      </a>
    </article>
  );
};
