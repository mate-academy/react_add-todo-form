import React from 'react';
import classNames from 'classnames';

import UserInfo from '../UserInfo/UserInfo';
import { User } from '../../types/User';

import './TodoInfo.scss';

type Props = {
  title: string;
  completed: boolean;
  user?: User;
};

const TodoInfo: React.FC<Props> = ({
  title,
  completed,
  user,
}) => (
  <>
    <div className="todo-item__title">
      {title}
    </div>
    {user && (
      <UserInfo
        user={user}
      />
    )}
    <div className={classNames(
      'todo-item__status',
      {
        'todo-item__status--done': completed === true,
        'todo-item__status--undone': completed === false,
      },
    )}
    />
  </>
);

TodoInfo.defaultProps = {
  user: {
    id: 0,
    name: 'no name...',
    email: 'no email',
  },
};

export default TodoInfo;
