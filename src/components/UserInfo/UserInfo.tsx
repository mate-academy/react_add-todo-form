import { FC } from 'react';
import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: FC<Props> = ({
  user: {
    name,
    email,
    id,
  },
}) => {
  const link = `mailto:${email}`;

  return (
    <a className="UserInfo" data-id={id} href={link}>
      {name}
    </a>
  );
};
