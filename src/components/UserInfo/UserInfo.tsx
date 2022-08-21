import React from 'react';

type Props = {
  user: User | null | undefined;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <>
      <div>
        {`Name: ${user.name}`}
      </div>

      <div>
        {`E-mail: ${user.email}`}
      </div>
    </>
  );
};
