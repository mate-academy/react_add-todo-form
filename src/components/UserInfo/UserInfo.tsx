import React from 'react';
import { User } from '../../props/userProps';
import { Todo } from '../../props/todoProps';

type UserInfoProps = {
  todo: Todo;
  users: User[];
};

export const UserInfo: React.FC<UserInfoProps> = ({ todo, users }) => {
  const curentUser = users.find(user => user.id === todo.userId);

  return (
    <>
      {curentUser && (
        <a className="UserInfo" href={`mailto:${curentUser.email}`}>
          {curentUser.name}
        </a>
      )}
    </>
  );
};
