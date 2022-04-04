import React from 'react';

type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  user && (
    <p className="is-italic">
      {`Name: ${user.name}`}
      <br />
      {`Email: ${user.email}`}
    </p>
  )
);
