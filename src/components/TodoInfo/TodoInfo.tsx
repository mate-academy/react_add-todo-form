import React from 'react';
import './TodoInfo.scss';
import { Users } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  title: string;
  completed: boolean;
  // eslint-disable-next-line react/require-default-props
  user?: Users;
};

export const TodoInfo: React.FC<Props> = ({
  title,
  completed,
  user,
}) => (
  <>
    <p>
      <div>
        <span className="todo-info__title">Task: </span>
        {title}
      </div>
      <div>
        <span className="todo-info__title">Сompleted: </span>
        {completed ? 'Yes' : 'No'}
      </div>
    </p>
    {user && <UserInfo user={user} />}
  </>
);
