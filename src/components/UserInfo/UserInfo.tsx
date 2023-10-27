import React from 'react';
import { Todo } from '../../types/ToDo';

type Props = {
  todo: Todo;
};
export const UserInfo:React.FC<Props> = ({ todo }) => (
  <a
    className="UserInfo"
    href={`mailto:${todo.user?.email}`}
  >
    {todo.user?.name}
  </a>
);
