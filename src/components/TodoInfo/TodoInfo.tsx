import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  };
}

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
    user: { name, email },
  },
}) => {
  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2
        className={classNames('TodoInfo__title', {
          'TodoInfo__title--completed': completed,
        })}
      >
        {title}
      </h2>
      <UserInfo userName={name} userEmail={email} />
    </article>
  );
};
