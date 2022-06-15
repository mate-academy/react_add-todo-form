import React from 'react';
import { User } from '../Types/Types';

type Props = {
  user: User,
};

export const UserData: React.FC<Props> = React.memo(({ user }) => (
  <div>
    {`UserName: ${user.name} `}
    <br />
    {` UserEmail: ${user.email}`}
    <hr />
  </div>
));
