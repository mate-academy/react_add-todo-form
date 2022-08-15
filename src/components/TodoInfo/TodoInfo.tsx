import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../type/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id, title, completed, user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'box notification',
        {
          'is-info': completed,
          'is-warning': !completed,
        },
      )}
    >
      <h2 className="title is-5">
        {title}
      </h2>

      {user && (<UserInfo user={user} />)}
    </article>
  );
};
