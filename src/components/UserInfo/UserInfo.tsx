import React from 'react';

type Props = {
  name: string,
  email: string,
  userId:number,
};

export const UserInfo: React.FC<Props> = ({
  name,
  email,
  userId,
}) => (
  <>
    <b>
      {'User Name: '}
    </b>
    {name}
    <br />
    <b>
      {'Email: '}
    </b>
    {email}
    <br />
    <b>
      {'User ID: '}
    </b>
    {userId}
  </>
);
