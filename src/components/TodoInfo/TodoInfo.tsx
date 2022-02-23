import React from 'react';
import { Todo } from '../../interfaces/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = Todo;

export const TodoInfo: React.FC<Props> = ({
  title,
  completed,
  user,
}) => (
  <>
    <h1 className="item__title">{title}</h1>
    <p className="item__status">
      Status:
      {completed
        ? ' completed'
        : ' not completed'}
    </p>
    <UserInfo
      name={user?.name}
      email={user?.email}
    />
  </>
);
