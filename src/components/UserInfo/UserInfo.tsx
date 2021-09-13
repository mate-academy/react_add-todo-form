import React from 'react';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = (props) => {
  const { name } = props.user;

  return (
    <>
      <strong>User name is: </strong>
      {name}
    </>
  );
};
