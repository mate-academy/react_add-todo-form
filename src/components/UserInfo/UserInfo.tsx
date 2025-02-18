import React from 'react';
import { User } from '../../types/user';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = (props: Props) => {
  return (
    <a
      data-cy="UserInfo"
      className="UserInfo"
      href={`mailto:${props.user.email}`}
    >
      {props.user.name}
    </a>
  );
};
