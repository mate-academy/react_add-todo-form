import classNames from 'classnames';
import React from 'react';
import { FullTodo } from '../../react-app-env';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: FullTodo;
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    title, completed, user, id,
  },
}) => (
  <article
    data-id={id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {user && <UserInfo user={user} />}
  </article>
);
