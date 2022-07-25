import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      { todo.user && (
        <UserInfo user={todo.user} />
      )}
    </>
  );
};
