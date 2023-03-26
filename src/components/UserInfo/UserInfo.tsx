import React from 'react';
import { User } from '../../types/User';

type Props = {
  userid: number,
  userD: User[],
};

export const UserInfo: React.FC<Props> = ({ userid, userD }) => {
  const foundUser = userD.find(userdata => userdata.id === userid);

  return (
    <a className="UserInfo" href={`mailto:${foundUser ? foundUser.email : ''}`}>
      {foundUser ? foundUser.name : ''}
    </a>
  );
};
