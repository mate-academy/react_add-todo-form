import React from 'react';
import { User } from '../../App';

interface Props {
  user?: User; // Знак "?" робить проп безпечним
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <span className="UserInfo">Anonymous</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
