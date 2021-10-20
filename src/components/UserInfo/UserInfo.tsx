import React from 'react';
import { Todo } from '../../types/Todo';
import './UserInfo.scss';

type Props = {
  todo: Todo;
};

export const UserInfo: React.FC<Props> = ({ todo }) => (
  <>
    {`NAME: ${todo.user?.name}, EMAIL: ${todo.user?.email} `}
  </>
);
