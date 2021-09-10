import React from 'react';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <>
      <div>
        {user.name}
      </div>
      <div>
        {user.email}
      </div>
    </>

  );
};
