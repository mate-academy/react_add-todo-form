import React from 'react';
import { Todos } from '../../types';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <>
      <article
        data-id={id}
        className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
      >
        <h2 className="TodoInfo__title">{title}</h2>
        {user && <UserInfo user={user} />}
      </article>
    </>
  );
};
