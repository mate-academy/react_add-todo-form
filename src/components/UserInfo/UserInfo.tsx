import React from 'react';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = (props) => {
  const { user } = props;

  return (
    <>
      <ul>
        <li>
          Name:
          {' '}
          {user.name}
        </li>
        <li>
          Email:
          {' '}
          {user.email}
        </li>
      </ul>
    </>
  );
};
