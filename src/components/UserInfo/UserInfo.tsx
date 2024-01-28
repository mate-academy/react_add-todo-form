import React from 'react';

type UserProps = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
};

export const UserInfo: React.FC<UserProps> = ({ user }) => {
  let name;
  let email;

  if (user) {
    ({ name, email } = user);
  }

  return (
    <>
      {user && (
        <a className="UserInfo" href={`mailto:${email}`}>
          {name}
        </a>
      )}
    </>
  );
};
