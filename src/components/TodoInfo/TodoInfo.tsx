import React, { FC } from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: FC<Props> = ({ todo: { id, title, completed, user } }) => (
  <article
    data-id={id}
    className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
  >
    <h2 className="TodoInfo__title">{title}</h2>
    {user && <UserInfo user={user} />}
  </article>
);
