import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../react-app-env';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>
    <UserInfo user={todo.user} />
  </>
);
