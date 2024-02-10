import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id, title, completed, user,
  },
}) => (
  <article
    data-id={id}
    className={classNames('TodoInfo',
      { 'TodoInfo--completed': completed })}
  >
    <h2 className="TodoInfo__title">
      {title}
    </h2>

    {user && <UserInfo user={user} />}
  </article>
);
