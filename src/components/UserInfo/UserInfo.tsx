import { FC } from 'react';
import { User } from '../../react-app-env';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: FC<Props> = ({
  user: {
    name,
    email,
  },
}) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
