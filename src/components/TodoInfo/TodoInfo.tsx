import React from 'react';
import classNames from 'classnames';

import './TodoInfo.scss';

import { UserInfo } from '../UserInfo/UserInfo';

import Todo from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
    user,
  },
}) => {
  return (
    <li
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </li>
  );
};
