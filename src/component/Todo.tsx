import React from 'react';

type Props = {
  title: string,
  user: any,
};

export const Todo: React.FC<Props> = ({ title, user }) => (
  <>
    <p className="title">
      {title}
    </p>
    <p className="name">
      {user.name}
    </p>
  </>
);
