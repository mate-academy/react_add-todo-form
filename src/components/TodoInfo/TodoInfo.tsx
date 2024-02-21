import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  key: number,
  todo: {
    id: number,
    title: string,
    completed: boolean,
    userId: number,
    user: {
      id: number,
      name: string,
      username: string,
      email: string,
    }
  }
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    id, title, completed, user,
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

      <UserInfo
        user={user}
      />

    </article>
  );
};
