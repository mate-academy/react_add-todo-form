import React from 'react';
import { User } from '../../types/User';
import '../../styles/components/UserInfo.scss';

type Props = User;

export const UserInfo: React.FC<Props> = ({
  fullName,
  username,
  email,
}) => (
  <div className="
    UserInfo
    d-flex
    flex-column
    align-items-center
  "
  >
    <p className="UserInfo__name" title={`Username - ${username}`}>
      {fullName}
    </p>

    <a className="UserInfo__email" href={`mailto: ${email}`}>
      {email}
    </a>
  </div>
);
