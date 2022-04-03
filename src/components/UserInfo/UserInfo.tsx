import React from 'react';
import { User } from '../../types/types';

type Props = User;

export const UserInfo: React.FC<Props> = ({
  name, email, website,
}) => {
  return (
    <div className="user-info">
      <h4 className="user-info__name">
        {name}
      </h4>

      <div>
        <span>Email: </span>
        <a
          href={`mailto: ${email}`}
          className="user-info__link"
        >
          {email}
        </a>
      </div>

      <div>
        <span>Website: </span>
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="user-info__link"
        >
          {website}
        </a>
      </div>
    </div>
  );
};
